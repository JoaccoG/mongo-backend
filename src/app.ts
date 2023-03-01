import express from 'express';
import cors from 'cors';
import apiRouter from './api/api-router.js';
import authRouter from './api/auth/auth-router.js';

const app = express();

app.get('/', (_req, res) => {
  res.json('Server is now ON');
});

app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

export default app;
