import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { instanceToInstance } from 'class-transformer'


export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response>{
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      userId: request.user.id as string,
      avatarFileName: request.file?.originalname as string
    });

    return response.json(instanceToInstance(user));
  }
}

