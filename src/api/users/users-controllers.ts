// Make all the necessary controllers according to the routes.

import { RequestHandler } from 'express';
import { User, UserModel } from './users-model.js';
import { UserLocalsAuthInfo, UserQueryId } from '../../types/types.js';
import log from '../../logger.js';

export const getUsersController: RequestHandler<
  never,
  User[],
  never,
  never,
  UserLocalsAuthInfo
> = async (_req, res) => {
  const users = await UserModel.find({}).exec();
  if (users !== null) {
    return res.status(200).json(users);
  }

  return res.sendStatus(404);
};

export const getUserByIdController: RequestHandler<UserQueryId> = async (
  req,
  res,
) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id }).exec();
  if (user !== null) {
    return res.status(200).json(user);
  }

  log.error(id, user);
  return res.sendStatus(404);
};

export const addFollowersController: RequestHandler<{
  id: string;
  idFollower: string;
}> = async (req, res) => {
  const { id, idFollower } = req.params;

  if (id === idFollower) {
    return res
      .status(400)
      .json({ msg: 'User cant be added to its own followers list' });
  }

  const user = await UserModel.findById({ _id: id }).exec();
  const follower = await UserModel.findById({ _id: idFollower }).exec();

  if (user === null) {
    return res.status(404).json({ msg: 'User to update not found' });
  }

  if (follower === null) {
    return res.status(404).json({ msg: 'Favorite user not found' });
  }

  if (user !== null && follower !== null) {
    const followerDb = await UserModel.updateOne(
      { _id: id },
      { $push: { followers: idFollower } },
    );

    if (followerDb.modifiedCount === 0) {
      return res.status(400).json({ msg: 'The user is already follower' });
    }

    return res.status(201).json({ msg: 'Favorites list successfully updated' });
  }

  log.error('Internal server error', user, follower);
  return res.sendStatus(500);
};
