import db from '../drizzle/db';
import { commentsTable, ordersTable, restaurantTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const getCommentsForRestaurant = async (restaurantId: number) => {
    try {
        const comments = await db.select({
            comment: commentsTable,
        })
        .from(commentsTable)
        .innerJoin(ordersTable, eq(commentsTable.order_id, ordersTable.id))
        .where(eq(ordersTable.restaurant_id, restaurantId));

        return comments;
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        throw new Error('Failed to fetch comments');
    }
}
