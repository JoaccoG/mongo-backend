import bunyan from 'bunyan';

describe('Given a log function', () => {
  test('When the log is defined, then it should be an instance of bunyan', async () => {
    const log = (await import('./logger')).default;
    expect(log).toBeInstanceOf(bunyan);
  });

  test('When the log level environment variable is not defined, then the log level should be info', async () => {
    process.env.BUNYAN_LEVEL = undefined;
    const log = (await import('./logger')).default;
    expect(log.level()).toBe(20);
  });
});
