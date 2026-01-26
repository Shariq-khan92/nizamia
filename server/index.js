import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Vercel proxy support
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());
app.use(hpp());

// Final Fix for ValidationError
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    validate: { trustProxy: false }, // Ye line ValidationError ko khatam kar degi
});
app.use(limiter);

// Add CORS headers manually for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }

    next();
});

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin || 'none'}`);
    next();
});

// Handle preflight requests
app.options('*', (req, res) => {
    console.log('Handling OPTIONS preflight request');
    res.sendStatus(200);
});

// Routes
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import buyerRoutes from './routes/buyerRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import designationRoutes from './routes/designationRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
    res.send('Nizamia OMS Backend is running!');
});

// Export for Vercel
export default app;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}