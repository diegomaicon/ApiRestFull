import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const resdisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined
    });

    const limiter = new RateLimiterRedis({
      storeClient: resdisClient,
      keyPrefix: 'ratelimit',
      points: 1,
      duration: 1
    });

    await limiter.consume(request.ip as string);

    return next();
  } catch (error) {
    throw new AppError('Too many requests.', 429);
  }
}


