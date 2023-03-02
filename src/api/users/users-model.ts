import mongoose, { Schema } from 'mongoose';

export interface Follower {
  id: string;
  name: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
  followers: Follower[];
}

const userSchema = new Schema<User>({
  email: String,
  password: String,
  name: String,
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
