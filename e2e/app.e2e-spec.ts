import { A3Page } from './app.po';

describe('a3 App', function() {
  let page: A3Page;

  beforeEach(() => {
    page = new A3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
