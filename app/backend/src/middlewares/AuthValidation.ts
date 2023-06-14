import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const verification = verify(token, JWT_SECRET);
    res.locals.user = verification;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
