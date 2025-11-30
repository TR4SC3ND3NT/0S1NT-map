import nodemailer from 'nodemailer';
import { config } from './config.js';

const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.secure,
  auth: config.mail.user
    ? {
        user: config.mail.user,
        pass: config.mail.pass
      }
    : undefined
});

export default transporter;
