import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIrestaurant,TSrestaurant, restaurantTable } from "../drizzle/schema";

export const restaurantService = async (limit?: number): Promise<TSrestaurant[] | null> => {
    if (limit) {
        return await db.select().from(restaurantTable)
    }
    return await db.select().from(restaurantTable)
}

export const getRestaurantService = async (id: number): Promise<TSrestaurant | undefined> => {
    const restaurantArray = await db.select().from(restaurantTable).where(eq(restaurantTable.id, id)).execute();

    if (restaurantArray.length === 0) {
        return undefined;
    }

    return restaurantArray[0];
}

export const createRestaurantService = async (Restaurant: TIrestaurant) => {
    await db.insert(restaurantTable).values(Restaurant)
    return "Restaurant created successfully";
}

export const updateRestaurantService = async (id: number, Restaurant: TIrestaurant) => {
    await db.update(restaurantTable).set(Restaurant).where(eq(restaurantTable.id, id))
    return "Restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id))
    return "Restaurant deleted successfully";
}