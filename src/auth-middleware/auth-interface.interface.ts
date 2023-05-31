import { Request } from 'express';
export interface GetUserAuthInfoRequest extends Request {
  userId: string;
}
