import bunyan, { LogLevel } from 'bunyan';
import dotenv from 'dotenv';
dotenv.config();

const log = bunyan.createLogger({ name: 'CarsApp' });
log.level((process.env.BUNYAN_LEVEL as LogLevel) ?? 'info');

export default log;
