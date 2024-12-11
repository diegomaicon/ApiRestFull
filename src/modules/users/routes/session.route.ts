import { Router } from "express";
import SessionsController from "../controllers/SessionsController";
import { celebrate, Joi, Segments } from "celebrate";

const sessionRouter = Router();
const sessionController = new SessionsController;

sessionRouter.post(
  '/',
  celebrate({
    [Segments.PARAMS]: {},
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionController.create
);

export default sessionRouter;
