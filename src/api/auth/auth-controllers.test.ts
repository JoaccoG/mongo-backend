import { Request, Response } from 'express';
import { User, UserModel } from '../users/users-model';
import { registerController } from './auth-controllers';
import crypto from 'node:crypto';
import { encryptPassword } from './auth-utils';
import dotenv from 'dotenv';
dotenv.config();

describe('Given a register controller', () => {
  // Mockear crypto.randomUUID
  crypto.randomUUID = jest.fn().mockReturnValue('id-0');
  // Mockear la request con el body que te manda el usuario (un user con email y password normales)
  const request = {
    body: {
      email: 'mock@email.com',
      password: 'mockedPassword',
    },
  } as Partial<Request>;
  // Mockear la response
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  // Mockear el usuario que espero que sea llamado con UserModel.create()
  const newUser: User = {
    id: crypto.randomUUID(),
    email: 'mock@email.com',
    password: encryptPassword('mockedPassword'),
  };

  test('When the user tries to register, then the new user should be created on the database', async () => {
    UserModel.create = jest.fn();
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(null),
    }));
    await registerController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(201);
    expect(UserModel.create).toHaveBeenCalledWith(newUser);
  });

  test('When the recevied email is already on database, then the response should be a 409 status', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(1),
    }));
    await registerController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(409);
  });
});
