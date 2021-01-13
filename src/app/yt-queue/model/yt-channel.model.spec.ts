import { YtChannel } from './yt-channel.model';

describe('YtChannel', () => {
  it('should create an instance', () => {
    expect(new YtChannel(JSON.parse('{}'))).toBeTruthy();
  });
});
