import { Context } from "hono";
import { getCommentsForRestaurant } from '../commentsComplaints/commentComplaint.service';

export const getCommentsForRestaurantController = async (c: Context) => {
    try {
        const restaurantId = parseInt(c.req.param("restaurantId"));
        if (isNaN(restaurantId)) return c.text("Invalid restaurant ID", 400);

        const comments = await getCommentsForRestaurant(restaurantId);
        if (!comments || comments.length === 0) {
            return c.text("No comments found for this restaurant", 404);
        }

        return c.json(comments, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
