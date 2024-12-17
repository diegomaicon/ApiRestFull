import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.route';
import usersRouter from '@modules/users/routes/user.route';
import sessionsRouter from '@modules/users/routes/session.route'
import passwordRouter from '@modules/users/routes/password.route';
import profileRouter from '@modules/users/routes/profile.route';
import customersRouter from '@modules/customers/routes/customers.route';
import ordersRouter from '@modules/orders/routers/order.route';


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

routes.get('/', (request, response) => {
  return response.json({ mensage: '[API - Vendas]' });
});

export default routes;
