import { Router } from 'express';


const routes = Router();

routes.get('/', (reqest, response) => {
  return response.json({ mensage: 'Hello Dev!' });
});

export default routes;
