import mongoose from 'mongoose';

const connectDB = (urlBD: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(urlBD, error => {
      if (error) {
        reject(new Error('Error connecting to database'));
      }

      resolve(true);
    });
  });

export default connectDB;
