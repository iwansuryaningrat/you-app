import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { HttpAdapterHost } from '@nestjs/core';

describe('UsersController', () => {
  let app: INestApplication;
  let httpAdapterHost: HttpAdapterHost;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([
          {
            name: Users.name,
            schema: UsersSchema,
          },
        ]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    const app = moduleFixture.createNestApplication();
    httpAdapterHost = moduleFixture.get(HttpAdapterHost);

    await app.init();
  });

  const createProfile = {
    name: 'test',
    birthday: '12-12-2000',
    height: 180,
    weight: 80,
    interests: ['test1', 'test2'],
  };

  const horoscope = 'Sagittarius';
  const zodiac = 'Dragon';

  const userData = {
    email: 'test1685524668950@mail.com',
    username: 'test1685524668950',
  };

  const headers: any = {
    'x-access-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzcxMGJkMDBkYThkMjQ5Mjk5ODFiNSIsInVzZXJuYW1lIjoidGVzdDE2ODU1MjQ2Njg5NTAiLCJlbWFpbCI6InRlc3QxNjg1NTI0NjY4OTUwQG1haWwuY29tIiwiaWF0IjoxNjg1NjMxNDQ2LCJleHAiOjE2ODU2MzUwNDZ9.wH9raLWa17kUI59kmvYGLtBZn68az9hZVzSNgd23eQg',
    Accept: 'application/json',
  };

  it('createProfile', async () => {
    const httpServer = httpAdapterHost.httpAdapter.getHttpServer();
    return request(httpServer)
      .post('/api/createProfile')
      .send(createProfile)
      .set(headers)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toBe('Profile has been created successfully');
        expect(res.body.data.username).toBe(userData.username);
        expect(res.body.data.email).toBe(userData.email);
        expect(res.body.data.name).toBe(createProfile.name);
        expect(res.body.data.birthday).toBe(createProfile.birthday);
        expect(res.body.data.horoscope).toBe(horoscope);
        expect(res.body.data.zodiac).toBe(zodiac);
        expect(res.body.data.height).toBe(createProfile.height);
        expect(res.body.data.weight).toBe(createProfile.weight);
        expect(res.body.data.interests).toStrictEqual(createProfile.interests);
      });
  });

  it('getProfile', async () => {
    const httpServer = httpAdapterHost.httpAdapter.getHttpServer();
    return request(httpServer)
      .get('/api/getProfile')
      .set(headers)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Profile has been found successfully');
        expect(res.body.data.username).toBe(userData.username);
        expect(res.body.data.email).toBe(userData.email);
        expect(res.body.data.name).toBe(createProfile.name);
        expect(res.body.data.birthday).toBe(createProfile.birthday);
        expect(res.body.data.horoscope).toBe(horoscope);
        expect(res.body.data.zodiac).toBe(zodiac);
        expect(res.body.data.height).toBe(createProfile.height);
        expect(res.body.data.weight).toBe(createProfile.weight);
        expect(res.body.data.interests).toStrictEqual(createProfile.interests);
      });
  });

  it('updateProfile', async () => {
    const httpServer = httpAdapterHost.httpAdapter.getHttpServer();
    return request(httpServer)
      .put('/api/updateProfile')
      .send(createProfile)
      .set(headers)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Profile has been updated successfully');
        expect(res.body.data.username).toBe(userData.username);
        expect(res.body.data.email).toBe(userData.email);
        expect(res.body.data.name).toBe(createProfile.name);
        expect(res.body.data.birthday).toBe(createProfile.birthday);
        expect(res.body.data.horoscope).toBe(horoscope);
        expect(res.body.data.zodiac).toBe(zodiac);
        expect(res.body.data.height).toBe(createProfile.height);
        expect(res.body.data.weight).toBe(createProfile.weight);
        expect(res.body.data.interests).toStrictEqual(createProfile.interests);
      });
  });
});
