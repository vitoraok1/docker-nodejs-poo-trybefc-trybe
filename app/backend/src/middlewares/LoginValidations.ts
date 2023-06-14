import { Request, Response, NextFunction } from 'express';

function loginValidate(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email) || password === undefined || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}

export default loginValidate;
