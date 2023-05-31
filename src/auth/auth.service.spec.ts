import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { AppModule } from '../app.module';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
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
    expect(await service.register(register)).toEqual({
      message: 'User has been created successfully',
    });
  });

  it('login', async () => {
    expect(await service.login(login)).toHaveProperty('access_token');
  });
});
