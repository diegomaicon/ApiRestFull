import { Request, Response } from "express";
import ResetPasswordServide from "../services/ResetPasswordServide";


export default class ResetPasswordController {

   public async create(request: Request, response: Response): Promise<Response>{
    const { token, password } = request.body;

    const resetPasswordServide = new ResetPasswordServide();

    await resetPasswordServide.execute({
       token, password
    });

    return response.status(204).json();
   }
}
