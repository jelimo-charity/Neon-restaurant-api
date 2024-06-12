import { Hono } from 'hono';
import { getCommentsForRestaurantController } from '../commentsComplaints/commentComplaint.controller';

const commentComplaintRouter = new Hono();

commentComplaintRouter.get('/restaurant/:restaurantId/commentscomplaints', getCommentsForRestaurantController);

export default commentComplaintRouter;
