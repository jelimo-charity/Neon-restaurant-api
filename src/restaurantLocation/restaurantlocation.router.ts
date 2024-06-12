import { Hono } from 'hono';
import { getRestaurantDetailsController } from '../restaurantLocation/restaurantlocation.controller';

const restaurantLocationRouter = new Hono();
restaurantLocationRouter.get('/restaurant/:restaurantId/location', getRestaurantDetailsController);

export default restaurantLocationRouter;
