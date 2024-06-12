import { Hono } from 'hono';
import { getActiveMenuItemsController } from '../restaurantMenuItems/restaurantMenu.controller';

const restaurantMenuRouter = new Hono();

restaurantMenuRouter.get('/restaurant/:restaurantId/activeMenuItems', getActiveMenuItemsController);

export default restaurantMenuRouter;
