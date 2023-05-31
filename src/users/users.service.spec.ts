import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { AppModule } from '../app.module';

describe('UsersService', () => {
  let service: UsersService;

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
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  const userData = {
    email: 'test1685524742531@mail.com',
    username: 'test1685524742531',
  };

  const createProfile = {
    name: 'test',
    birthday: '12-12-2000',
    horoscope: 'Capricorn',
    height: 180,
    weight: 80,
    interests: ['test1', 'test2'],
  };

  it('Create profile', async () => {
    const result = await service.create(
      '64771106f6bb9b139f991d3d',
      createProfile,
    );

    expect(result.email).toBe(userData.email);
    expect(result.username).toBe(userData.username);
    expect(result.name).toBe(createProfile.name);
    expect(result.birthday).toBe(createProfile.birthday);
    expect(result.horoscope).toBe(createProfile.horoscope);
    expect(result.height).toBe(createProfile.height);
    expect(result.weight).toBe(createProfile.weight);
    expect(result.interests).toStrictEqual(createProfile.interests);
  });

  it('Find one profile', async () => {
    const result = await service.findOne('64771106f6bb9b139f991d3d');

    expect(result.email).toBe(userData.email);
    expect(result.username).toBe(userData.username);
    expect(result.name).toBe(createProfile.name);
    expect(result.birthday).toBe(createProfile.birthday);
    expect(result.horoscope).toBe(createProfile.horoscope);
    expect(result.height).toBe(createProfile.height);
    expect(result.weight).toBe(createProfile.weight);
    expect(result.interests).toStrictEqual(createProfile.interests);
  });

  it('Update profile', async () => {
    const result = await service.update(
      '64771106f6bb9b139f991d3d',
      createProfile,
    );

    expect(result.email).toBe(userData.email);
    expect(result.username).toBe(userData.username);
    expect(result.name).toBe(createProfile.name);
    expect(result.birthday).toBe(createProfile.birthday);
    expect(result.horoscope).toBe(createProfile.horoscope);
    expect(result.height).toBe(createProfile.height);
    expect(result.weight).toBe(createProfile.weight);
    expect(result.interests).toStrictEqual(createProfile.interests);
  });
});
