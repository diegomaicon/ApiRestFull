import { Router, response } from "express";
import { request } from "http";

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({mensage:'Helo Dev!'})
})
