import { MdrUpgradedPage } from './app.po';

describe('mdr-upgraded App', () => {
  let page: MdrUpgradedPage;

  beforeEach(() => {
    page = new MdrUpgradedPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
