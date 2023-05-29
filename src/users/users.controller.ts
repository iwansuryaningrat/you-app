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

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createProfile')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('getProfile')
  findOne(@Request() Request) {
    const id = Request.id;
    return this.usersService.findOne(id);
  }

  @Put('updateProfile')
  update(@Request() Request, @Body() updateUserDto: UpdateUserDto) {
    const id = Request.id;
    return this.usersService.update(id, updateUserDto);
  }
}
