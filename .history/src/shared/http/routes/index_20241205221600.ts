import { Router } from 'express';


const routes = Router();

routes.get('/', (request, any) => {
  return response.json({ mensage: 'Hello Dev!' });
});

export default routes;
