import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../users/schemas/users.schema';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const userCheckUsername = await this.usersModel.findOne({
      username: registerDto.username,
    });

    const userCheckEmail = await this.usersModel.findOne({
      email: registerDto.email,
    });

    if (userCheckUsername || userCheckEmail) {
      return {
        message: 'User already exists',
      };
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(registerDto.password, salt);
    registerDto.password = hashPassword;

    const user = new this.usersModel(registerDto);

    const result = user.save();
    console.log(result);

    return {
      message: 'User has been created successfully',
    };
  }

  async login(loginDto: LoginDto) {
    if (!loginDto.email && !loginDto.username) {
      return {
        message: 'Email or username is required',
      };
    }

    if (!loginDto.email && loginDto.username) {
      var user = await this.usersModel.findOne({
        username: loginDto.username,
      });
    } else {
      var user = await this.usersModel.findOne({
        email: loginDto.email,
      });
    }

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      return {
        message: 'Incorrect password',
      };
    }

    const token = this.jwtService.sign({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    return {
      message: 'User has been logged in successfully',
      token,
    };
  }
}
