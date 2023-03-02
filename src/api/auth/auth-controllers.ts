import crypto from 'node:crypto';
import { RequestHandler } from 'express';
import { User, UserModel } from './auth-schema.js';
import { encryptPassword } from './auth-utils.js';

export interface LoginResponse {
  accessToken: string;
}

export const registerController: RequestHandler<
  unknown,
  unknown,
  User
> = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email }).exec();
  if (existingUser !== null) {
    return res.status(409).json({ msg: 'That email is already registered' });
  }

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: encryptPassword(password),
  };

  await UserModel.create(newUser);
  return res.status(201).json({ msg: 'New user successfully created!' });
};
