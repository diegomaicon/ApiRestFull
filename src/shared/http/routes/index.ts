import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.route';
import usersRouter from '@modules/users/routes/user.route';
import sessionsRouter from '@modules/users/routes/session.route'
import passwordRouter from '@modules/users/routes/password.route';


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.get('/', (request, response) => {
  return response.json({ mensage: 'Hello Dev!' });
});

export default routes;
