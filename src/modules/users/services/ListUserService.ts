import { Any, getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return users;
  }
}
export default ListUserService
