import crypto from 'crypto';

export function generateRandomString(length = 32) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}
