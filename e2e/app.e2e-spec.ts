import { PersonalFinancesPage } from './app.po';

describe('personal-finances App', function() {
  let page: PersonalFinancesPage;

  beforeEach(() => {
    page = new PersonalFinancesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
