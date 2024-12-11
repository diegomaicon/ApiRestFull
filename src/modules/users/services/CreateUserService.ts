import { Any, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";


interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password}: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExist = await userRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
        name, email, password: hashedPassword
    });



    await userRepository.save(user);

    return user;
  }
}
export default CreateUserService
