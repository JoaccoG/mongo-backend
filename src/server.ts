import dotenv from 'dotenv';
import log from './logger.js';
import app from './app.js';
import { connectDB } from './database/connection.js';

dotenv.config();

const port = process.env.PORT ?? 3000;
const mongoUrl = process.env.MONGO_URL ?? '';

app.listen(port, async () => {
  await connectDB(mongoUrl);
  log.info(`Server started in port ${port}`);
});
