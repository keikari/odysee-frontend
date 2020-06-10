import { Discord } from './discord';

describe('Discord', () => {
  it('should create an instance', () => {
    expect(new Discord()).toBeTruthy();
  });
});
