import { Any, getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import uploadConfig from '@config/upload'
import S3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({userId, avatarFileName}: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    avatarFileName = `${userId}_avatar.jpg`;

    let filename = "";

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      filename = await s3Provider.saveFile(avatarFileName);
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }
      filename = await diskProvider.saveFile(avatarFileName);
    }

    user.avatar = filename;

    await userRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService
