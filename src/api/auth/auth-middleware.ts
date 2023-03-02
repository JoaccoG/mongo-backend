import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware: RequestHandler = (req, res, next) => {
  const jwtToken = req.headers.authorization?.split(' ')[1];
  if (!jwtToken) {
    return res.status(401).json('Unauthorized');
  }

  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json('JWT_SECRET environment variable is not defined');
  }

  const payload = jwt.verify(
    jwtToken,
    process.env.JWT_SECRET,
  ) as jwt.JwtPayload;

  res.locals.email = payload.email;

  next();
};
