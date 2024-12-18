import { Any, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string
}

class CreateSessionService {
  public async execute({ email, password}: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.',401);
    }

    const hashedConfirmed = await compare(password, user.password);

    if (!hashedConfirmed) {
      throw new AppError('Incorrect email/password combination.',401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return { user, token };
  }
}
export default CreateSessionService
