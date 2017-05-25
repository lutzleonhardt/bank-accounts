import { BankAccountsPage } from './app.po';

describe('bank-accounts App', () => {
  let page: BankAccountsPage;

  beforeEach(() => {
    page = new BankAccountsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
