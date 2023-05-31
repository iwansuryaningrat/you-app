import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../app.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([
          {
            name: Users.name,
            schema: UsersSchema,
          },
        ]),
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  const timestamp = new Date().getTime();

  const register = {
    username: `test${timestamp}`,
    email: `test${timestamp}@mail.com`,
    password: 'testing1234',
  };

  const login = {
    username: `test${timestamp}`,
    email: `test${timestamp}@mail.com`,
    password: 'testing1234',
  };

  it('register', async () => {
    expect(await controller.register(register)).toEqual({
      message: 'User has been created successfully',
    });
  });

  it('login', async () => {
    expect(await controller.login(login)).toHaveProperty('access_token');
  });
});
