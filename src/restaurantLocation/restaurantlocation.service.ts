import db from '../drizzle/db';
import { restaurantTable, cityTable, stateTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const getRestaurantDetails = async (restaurantId: number) => {
    try {
        const restaurantDetails = await db.select({
            restaurant: restaurantTable,
            city: cityTable,
            state: stateTable,
        })
        .from(restaurantTable)
        .innerJoin(cityTable, eq(restaurantTable.city_id, cityTable.id))
        .innerJoin(stateTable, eq(cityTable.state_id, stateTable.id))
        .where(eq(restaurantTable.id, restaurantId));

        return restaurantDetails;
    } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
        throw new Error('Failed to fetch restaurant details');
    }
}
