import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

export const createCypher = () => {
  if (process.env.PASSWORD_ENCRYPTION_ALGORITHM === undefined) {
    throw new Error('Encryption algotithm must be defined on env');
  }

  if (process.env.PASSWORD_ENCRYPTION_KEY === undefined) {
    throw new Error('Encryption key must be defined on env');
  }

  const key = crypto
    .createHash('sha256')
    .update(String(process.env.PASSWORD_ENCRYPTION_KEY))
    .digest('base64')
    .substring(0, 32);
  const iv = crypto.randomBytes(0);

  return crypto.createCipheriv(
    process.env.PASSWORD_ENCRYPTION_ALGORITHM,
    key,
    iv,
  );
};

export const encryptPassword = (password: string) => {
  const cipher = createCypher();
  let encryptedPassword = cipher.update(password);
  encryptedPassword = Buffer.concat([encryptedPassword, cipher.final()]);
  return encryptedPassword.toString('hex');
};

export const generateJWTToken = (email: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment should be defined');
  }

  return jwt.sign({ email }, process.env.JWT_SECRET);
};
