import { AppPage } from './app.po';

describe('Commander App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display login screen', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Commander Login');
  });
});
