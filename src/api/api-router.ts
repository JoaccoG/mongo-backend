import express from 'express';
import { usersRouter } from './users/users-router.js';

const router = express.Router();

router.use('/user', usersRouter);

export default router;
