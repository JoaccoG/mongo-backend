import mongoose from 'mongoose';

export const connectDB = (urlBD: string) =>
  new Promise((resolve, reject) => {
    mongoose.set('strictQuery', false);
    mongoose.set('debug', true);
    mongoose.set('toJSON', {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.__v;
      },
    });
    mongoose.connect(urlBD, error => {
      if (error) {
        reject(new Error('Error connecting to database'));
      }

      resolve(true);
    });
  });
