import { Hono } from 'hono';
import { getUserOrdersController } from '../userOrders/userorder.controller';

const userOrderRouter = new Hono();

userOrderRouter.get('/users/:userId/orders', getUserOrdersController);

export default userOrderRouter;
