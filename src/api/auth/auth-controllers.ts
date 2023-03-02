import { RequestHandler } from 'express';
import { UserModel } from '../users/users-model.js';
import { encryptPassword, generateJWTToken } from './auth-utils.js';
import { AuthRequest, LoginResponse } from '../../types/types.js';

export const registerController: RequestHandler<
  unknown,
  unknown,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email }).exec();
  if (existingUser !== null) {
    return res.status(409).json({ msg: 'That email is already registered' });
  }

  const newUser = {
    email,
    password: encryptPassword(password),
  };

  await UserModel.create(newUser);
  return res.status(201).json({ msg: 'New user successfully created!' });
};

export const loginController: RequestHandler<
  unknown,
  LoginResponse,
  AuthRequest
> = async (req, res) => {
  const { email, password } = req.body;
  const filterUser = {
    email,
    password: encryptPassword(password),
  };

  const existingUser = await UserModel.find(filterUser).exec();

  if (existingUser === null) {
    return res.sendStatus(404);
  }

  const tokenJWT = generateJWTToken(email);
  return res.status(201).json({
    accessToken: tokenJWT,
  });
};
