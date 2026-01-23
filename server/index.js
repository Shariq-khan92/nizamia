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

// General Middleware
app.use(cors({
    origin: 'https://nizamia-frontend.vercel.app',
    credentials: true
}));

app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import designationRoutes from './routes/designationRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
    res.send('Nizamia OMS Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});