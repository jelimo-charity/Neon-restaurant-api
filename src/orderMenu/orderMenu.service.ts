import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIorderMenu, TSorderMenu, orderMenuTable } from "../drizzle/schema";

export const OrderMenuItemsService = async (limit?: number): Promise<TSorderMenu[] | null> => {
    if (limit) {
        return await db.select().from(orderMenuTable)
    }
    return await db.select().from(orderMenuTable);
}

export const getOrderMenuItemService = async (id: number): Promise<TSorderMenu | undefined> => {
    const orderMenuArray = await db.select().from(orderMenuTable).where(eq(orderMenuTable.id, id)).execute();

    if (orderMenuArray.length === 0) {
        return undefined;
    }

    return orderMenuArray[0];
}

export const createOrderMenuItemService = async (OrderMenuItem: TIorderMenu) => {
    await db.insert(orderMenuTable).values(OrderMenuItem)
    return "OrderMenuItem created successfully";
}

export const updateOrderMenuItemService = async (id: number, OrderMenuItem: TIorderMenu) => {
    await db.update(orderMenuTable).set(OrderMenuItem).where(eq(orderMenuTable.id, id))
    return "OrderMenuItem updated successfully";
}

export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(orderMenuTable).where(eq(orderMenuTable.id, id))
    return "OrderMenuItem deleted successfully";
}