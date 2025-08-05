import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
