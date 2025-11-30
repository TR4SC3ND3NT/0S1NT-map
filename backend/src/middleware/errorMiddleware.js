import { config } from '../config/config.js';
import logger from '../utils/logger.js';

export default function errorMiddleware(err, req, res, next) {
  logger.error(err.stack || err.message);
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'Internal server error'
  };
  if (config.env === 'development' && err.stack) {
    response.stack = err.stack;
  }
  res.status(statusCode).json(response);
}
