import { Any, getCustomRepository } from "typeorm";
import { compare,hash } from "bcryptjs";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest{
  user_id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    oldPassword
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.')
    }

    const userUpdateEmail = await userRepository.findByEmail(email);

    if (userUpdateEmail && (userUpdateEmail.id != user.id)) {
      throw new AppError('There is already one user with this email');
    }
    if (password && !oldPassword) {
       throw new AppError('Old password is required.');
    }

    if (oldPassword && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
       user.password = await hash(password as string, 8);
    }


    user.name = name;
    user.email = email;

    await userRepository.save(user);

    return user;
  }
}
export default UpdateProfileService
