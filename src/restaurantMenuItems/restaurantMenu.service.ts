import db from '../drizzle/db';
import { menuItemTable, restaurantTable, categoryTable } from '../drizzle/schema';
import { and, eq } from 'drizzle-orm';

export const getActiveMenuItems = async (restaurantId: number) => {
    try {
        const activeMenuItems = await db.select({
            menuItem: menuItemTable,
            category: categoryTable,
        })
        .from(menuItemTable)
        .innerJoin(restaurantTable, eq(menuItemTable.restaurant_id, restaurantTable.id))
        .innerJoin(categoryTable, eq(menuItemTable.category_id, categoryTable.id))
        .where(and(
            eq(menuItemTable.restaurant_id, restaurantId),
            eq(menuItemTable.active, 'true')
        ));

        return activeMenuItems;
    } catch (error) {
        console.error('Failed to fetch active menu items:', error);
        throw new Error('Failed to fetch active menu items');
    }
}
