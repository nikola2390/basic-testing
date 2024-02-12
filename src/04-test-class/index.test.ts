import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let account: BankAccount;
  const initialBalance = 1000;
  const newFetchedBalance = 5000;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + 100)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountForTransfer = getBankAccount(initialBalance);

    expect(() =>
      account.transfer(initialBalance + 100, accountForTransfer),
    ).toThrow(new InsufficientFundsError(initialBalance));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(500, account)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(500).getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(500).getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const accountForTransfer = getBankAccount(initialBalance);
    const transferAmount = 500;

    account.transfer(transferAmount, accountForTransfer);

    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(accountForTransfer.getBalance()).toBe(
      initialBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const spy = jest.spyOn(lodash, 'random');

    spy.mockReturnValueOnce(newFetchedBalance);
    spy.mockReturnValueOnce(1);

    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest.spyOn(account, 'fetchBalance');

    spy.mockResolvedValueOnce(newFetchedBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newFetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest.spyOn(account, 'fetchBalance');

    spy.mockResolvedValueOnce(null);

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
