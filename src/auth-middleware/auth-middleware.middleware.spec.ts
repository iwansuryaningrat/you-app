import { AuthMiddleware } from './auth-middleware.middleware';

describe('AuthMiddleware', () => {
  let jwtService: any;
  it('should be defined', () => {
    expect(new AuthMiddleware(jwtService)).toBeDefined();
  });
});
