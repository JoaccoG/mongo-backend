import { User } from '../users/user-model.js';

export interface UserLocalsAuthInfo {
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type AuthRequest = Pick<User, 'email' | 'password'>;
