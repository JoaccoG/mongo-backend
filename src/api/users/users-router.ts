import express from 'express';
import { validate } from 'express-validation';

export const usersRouter = express.Router();

usersRouter.use(validate({}));

usersRouter.route('/:id').get();
usersRouter.route('/').post();
usersRouter.route('/users/:id/followers/:idFollower').patch();
