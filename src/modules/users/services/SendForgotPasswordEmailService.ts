import { Any, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const usertokensRepository = getCustomRepository(UserTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email does not exists.');
    }

    const userToken = await usertokensRepository.generate(user.id);

    console.log(userToken);

  }
}
export default SendForgotPasswordEmailService
