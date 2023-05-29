import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schemas/users.schema';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    // const salt = await bcrypt.genSalt();
    // const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    // createUserDto.password = hashPassword;

    const users = new this.usersModel(createUserDto);

    return users.save();
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
