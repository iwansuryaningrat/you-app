import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { GetUserAuthInfoRequest } from './auth-interface.interface';

interface JwtPayload {
  id: string;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: GetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'No token provided.',
      });
    }

    const result = this.jwtService.verify(token.toString()) as JwtPayload;

    req.userId = result.id;

    next();
  }
}
