import { Any, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from 'date-fns'
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";


interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordServide {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const usertokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await usertokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
       throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

  }
}
export default ResetPasswordServide
