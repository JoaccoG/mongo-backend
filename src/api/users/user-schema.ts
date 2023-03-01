import mongoose, { Schema } from 'mongoose';

export interface User {
  id: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  id: String,
  email: String,
  password: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
