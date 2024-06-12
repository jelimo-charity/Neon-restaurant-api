import { Context } from "hono";
import { getUserOrders } from '../userOrders/userorder.service';

export const getUserOrdersController = async (c: Context) => {
    try {
        const userId = parseInt(c.req.param("userId"));
        if (isNaN(userId)) return c.text("Invalid user ID", 400);

        const orders = await getUserOrders(userId);
        if (!orders || orders.length === 0) {
            return c.text("No orders found for this user", 404);
        }

        return c.json(orders, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
