import { AppUIPage } from './app.po';

describe('app-ui App', () => {
  let page: AppUIPage;

  beforeEach(() => {
    page = new AppUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
