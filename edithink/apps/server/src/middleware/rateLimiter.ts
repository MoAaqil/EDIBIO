import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import { config } from '../config/env.js';

export function createRateLimiter(maxRequests: number, windowMinutes: number) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: `Too many requests, please try again in ${windowMinutes} minutes.`,
    },
    skip: (req: Request) => {
      // Skip rate limiting in development or test environment, and for health checks
      if (config.NODE_ENV === 'development' || config.NODE_ENV === 'test') {
        return true;
      }
      return req.path === '/health';
    },
  });
}

