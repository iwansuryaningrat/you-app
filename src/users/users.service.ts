import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async create(
    id: string,
    createUserDto: CreateUserDto,
  ): Promise<UsersDocument> {
    const users = this.usersModel.findByIdAndUpdate(id, createUserDto);

    if (!users) {
      throw new Error('User not found');
    }

    return users;
  }

  findOne(id: string) {
    return this.usersModel.findById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument> {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto);
  }
}
