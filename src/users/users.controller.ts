import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserAuthInfoRequest } from '../auth-middleware/auth-interface.interface';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createProfile')
  create(
    @Request() req: GetUserAuthInfoRequest,
    @Body() createUserDto: CreateUserDto,
  ) {
    const id = req.userId;
    return this.usersService.create(id, createUserDto);
  }

  @Get('getProfile')
  findOne(@Request() req: GetUserAuthInfoRequest) {
    const id = req.userId;
    return this.usersService.findOne(id);
  }

  @Put('updateProfile')
  update(
    @Request() req: GetUserAuthInfoRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = req.userId;
    return this.usersService.update(id, updateUserDto);
  }
}
