import { Controller, Get, Post, Body, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserAuthInfoRequest } from '../auth-middleware/auth-interface.interface';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'x-access-token',
  description: 'Access token',
})
@ApiTags('users')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create profile' })
  @ApiResponse({ status: 201, description: 'Profile has been created' })
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
      zodiac: user.zodiac,
      height: user.height,
      weight: user.weight,
      interests: user.interests,
    };

    return {
      message: 'Profile has been created successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Profile has been found' })
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
      zodiac: user.zodiac,
      height: user.height,
      weight: user.weight,
      interests: user.interests,
    };

    return {
      message: 'Profile has been found successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({ status: 200, description: 'Profile has been updated' })
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
      zodiac: user.zodiac,
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
