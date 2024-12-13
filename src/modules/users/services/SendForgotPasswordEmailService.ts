import { Any, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";
import EtherealMail from "@config/mail/EtherealMail";

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

    const { token }  = await usertokensRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        mail: user.email
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables:
          {
          name: user.name,
          token,
          }

      }
    })
  }
}
export default SendForgotPasswordEmailService
