import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthMeddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'No token provided.',
      });
    }

    jwt.verify(token.toString(), process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          auth: false,
          message: 'Failed to authenticate token.',
        });
      }

      req.body.id = decoded.id;
    });

    next();
  }
}
