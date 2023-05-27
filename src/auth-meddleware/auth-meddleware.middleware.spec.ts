import { AuthMeddlewareMiddleware } from './auth-meddleware.middleware';

describe('AuthMeddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMeddlewareMiddleware()).toBeDefined();
  });
});
