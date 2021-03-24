import { Report } from './report';

describe('Report', () => {
  it('should create an instance', () => {
    expect(new Report(JSON.parse('{}'))).toBeTruthy();
  });
});
