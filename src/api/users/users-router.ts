import express from 'express';
import {
  addFollowersController,
  getUserByIdController,
  getUsersController,
} from './users-controllers.js';

export const usersRouter = express.Router();

usersRouter.route('/').get(getUsersController).post();
usersRouter.route('/:id').get(getUserByIdController);
usersRouter.route('/:id/followers/:idFollower').patch(addFollowersController);
