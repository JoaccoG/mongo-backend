import bunyan from 'bunyan';
import log from './logger';

describe('Given a log function', () => {
  test('When the log is defined, then it should be an instance of bunyan', async () => {
    expect(log).toBeInstanceOf(bunyan);
  });
});
