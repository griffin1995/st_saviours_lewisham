import { NextApiRequest, NextApiResponse } from 'next';
import { sign, verify } from 'jsonwebtoken';

// Simple authentication - in production, use environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'StSaviours2025!';
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const { username, password, action } = req.body;

        if (action === 'login') {
          // Login
          if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const token = sign(
              { username, role: 'admin' },
              JWT_SECRET,
              { expiresIn: '24h' }
            );

            // Set HTTP-only cookie
            res.setHeader('Set-Cookie', [
              `admin-token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${
                process.env.NODE_ENV === 'production' ? '; Secure' : ''
              }`
            ]);

            res.status(200).json({ 
              success: true, 
              message: 'Login successful',
              user: { username, role: 'admin' }
            });
          } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
        } else if (action === 'logout') {
          // Logout
          res.setHeader('Set-Cookie', [
            `admin-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${
              process.env.NODE_ENV === 'production' ? '; Secure' : ''
            }`
          ]);
          res.status(200).json({ success: true, message: 'Logged out successfully' });
        } else {
          res.status(400).json({ success: false, message: 'Invalid action' });
        }
        break;

      case 'GET':
        // Verify current session
        const cookies = req.headers.cookie;
        if (!cookies) {
          res.status(401).json({ success: false, message: 'No token provided' });
          break;
        }

        const tokenMatch = cookies.match(/admin-token=([^;]+)/);
        if (!tokenMatch) {
          res.status(401).json({ success: false, message: 'No token provided' });
          break;
        }

        try {
          const decoded = verify(tokenMatch[1], JWT_SECRET) as any;
          res.status(200).json({ 
            success: true, 
            user: { username: decoded.username, role: decoded.role }
          });
        } catch (error) {
          res.status(401).json({ success: false, message: 'Invalid token' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Middleware function to protect admin routes
export function authenticateAdmin(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const cookies = req.headers.cookie;
  if (!cookies) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const tokenMatch = cookies.match(/admin-token=([^;]+)/);
  if (!tokenMatch) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    const decoded = verify(tokenMatch[1], JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Add user property to NextApiRequest type
declare module 'next' {
  interface NextApiRequest {
    user?: any;
  }
}