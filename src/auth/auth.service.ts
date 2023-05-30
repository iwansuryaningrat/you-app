import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../users/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  register(registerDto: RegisterDto) {
    return 'This action adds a new auth';
  }

  findByUsername(username: string) {
    return `This action returns a #${username} auth`;
  }

  findByEmail(email: string) {
    return `This action returns a #${email} auth`;
  }
}
