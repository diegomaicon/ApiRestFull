import { Router } from 'express';


const routes = Router();

routes.get('/', (, response) => {
  return response.json({ mensage: 'Hello Dev!' });
});

export default routes;
