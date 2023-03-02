import express from 'express';
import { validate } from 'express-validation';
import { registerController } from './auth-controllers.js';
import { authValidation } from './auth-validation.js';

const authRouter = express.Router();

authRouter.use(validate(authValidation));

authRouter.route('/register').post(registerController);
authRouter.route('/login').post();

export default authRouter;
