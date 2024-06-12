import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TSrestaurantOwner,TIrestaurantOwner, restaurantOwnerTable } from "../drizzle/schema";

export const restuarantOwnersService = async (limit?: number): Promise<TSrestaurantOwner[] | null> => {
    if (limit) {
        return await db.select().from(restaurantOwnerTable);

    }
    return await db.select().from(restaurantOwnerTable);
}

export const getRestaurantOwnerService = async (id: number): Promise<TSrestaurantOwner | undefined> => {
    const restaurantOwnerArray = await db.select().from(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id)).execute();

    if (restaurantOwnerArray.length === 0) {
        return undefined;
    }

    return restaurantOwnerArray[0];
}

export const createRestuarantOwnerService = async (RestuarantOwner: TIrestaurantOwner) => {
    await db.insert(restaurantOwnerTable).values(RestuarantOwner)
    return "RestuarantOwner created successfully";
}

export const updateRestuarantOwnerService = async (id: number, RestuarantOwner: TIrestaurantOwner) => {
    await db.update(restaurantOwnerTable).set(RestuarantOwner).where(eq(restaurantOwnerTable.id, id))
    return "RestuarantOwner updated successfully";
}

export const deleteRestuarantOwnerService = async (id: number) => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id))
    return "RestuarantOwner deleted successfully";
}