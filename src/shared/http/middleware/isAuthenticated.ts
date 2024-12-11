import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number,
  exp: number,
  sub: string

}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeadder = request.headers.authorization

  if (!authHeadder) {
    throw new AppError('JWT token is missing.');
  }

  const [,token] = authHeadder.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as ITokenPayload;

    request.user = {
      id: sub
    }

    return next();
  } catch {
      throw new AppError('Invalid JWT token.')
  }
}
