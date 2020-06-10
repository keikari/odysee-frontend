import { TimeoutInterceptor } from './timeout-interceptor';

describe('TimeoutInterceptor', () => {
  it('should create an instance', () => {
    expect(new TimeoutInterceptor(0)).toBeTruthy();
  });
});
