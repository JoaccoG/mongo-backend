import express from 'express';
import { registerController } from './auth-controllers.js';

const authRouter = express.Router();

authRouter.route('/register').post(registerController);
authRouter.route('/login').post();

export default authRouter;
