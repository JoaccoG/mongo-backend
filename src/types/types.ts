import { User } from '../api/users/users-model';

export interface UserLocalsAuthInfo {
  email: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type AuthRequest = Pick<User, 'email' | 'password'>;

export interface UserQueryId {
  id: string;
}
