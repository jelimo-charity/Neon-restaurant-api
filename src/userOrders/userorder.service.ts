import db from '../drizzle/db';
import { ordersTable, usersTable, restaurantTable, orderMenuTable, menuItemTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export async function getUserOrders(userId: number) {
    try {
        const userOrders = await db.select({
            orders: ordersTable,
            restaurant: restaurantTable,
            orderItems: orderMenuTable,
            menuItem: menuItemTable,
        })
        .from(ordersTable)
        .innerJoin(usersTable, eq(ordersTable.user_id, usersTable.id))
        .innerJoin(restaurantTable, eq(ordersTable.restaurant_id, restaurantTable.id))
        .innerJoin(orderMenuTable, eq(orderMenuTable.order_id, ordersTable.id))
        .innerJoin(menuItemTable, eq(orderMenuTable.menu_item_id, menuItemTable.id))
        .where(eq(usersTable.id, userId));

        return userOrders;
    } catch (error) {
        console.error('Failed to fetch user orders:', error);
        throw new Error('Failed to fetch user orders');
    }
}
