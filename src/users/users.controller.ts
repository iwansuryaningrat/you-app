import { Controller, Get, Post, Body, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserAuthInfoRequest } from '../auth-middleware/auth-interface.interface';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createProfile')
  async create(
    @Request() req: GetUserAuthInfoRequest,
    @Body() createUserDto: CreateUserDto,
  ) {
    const id = req.userId;

    const user = await this.usersService.create(id, createUserDto);

    const data = {
      email: user.email,
      username: user.username,
      name: user.name,
      birthday: user.birthday,
      horoscope: user.horoscope,
      height: user.height,
      weight: user.weight,
      interests: user.interests,
    };

    return {
      message: 'Profile has been created successfully',
      data,
    };
  }

  @Get('getProfile')
  async findOne(@Request() req: GetUserAuthInfoRequest) {
    const id = req.userId;
    const user = await this.usersService.findOne(id);

    const data = {
      email: user.email,
      username: user.username,
      name: user.name,
      birthday: user.birthday,
      horoscope: user.horoscope,
      height: user.height,
      weight: user.weight,
      interests: user.interests,
    };

    return {
      message: 'Profile has been found successfully',
      data,
    };
  }

  @Put('updateProfile')
  async update(
    @Request() req: GetUserAuthInfoRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = req.userId;
    const user = await this.usersService.update(id, updateUserDto);

    const data = {
      email: user.email,
      username: user.username,
      name: user.name,
      birthday: user.birthday,
      horoscope: user.horoscope,
      height: user.height,
      weight: user.weight,
      interests: user.interests,
    };

    return {
      message: 'Profile has been updated successfully',
      data,
    };
  }
}
