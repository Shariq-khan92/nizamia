import { registerUser, loginUser, getUsers } from '../../server/controllers/authController.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'POST':
        if (req.url === '/register' || req.url.endsWith('/register')) {
          return await registerUser(req, res);
        } else if (req.url === '/login' || req.url.endsWith('/login')) {
          return await loginUser(req, res);
        }
        break;
      case 'GET':
        return await getUsers(req, res);
      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    res.status(500).json({ message: error.message });
  }
}
