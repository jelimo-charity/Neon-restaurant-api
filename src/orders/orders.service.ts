import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIorders, TSorders, ordersTable } from "../drizzle/schema";

export const OrdersService = async (limit?: number): Promise<TSorders[] | null> => {
    if (limit) {
        return await db.select().from(ordersTable)
    }
    return await db.select().from(ordersTable);
}


export const getOrderService = async (id: number): Promise<TSorders | undefined> => {
    const orderArray = await db.select().from(ordersTable).where(eq(ordersTable.id, id)).execute();

    if (orderArray.length === 0) {
        return undefined;
    }

    return orderArray[0];
}

export const createOrderService = async (Order: TIorders) => {
    await db.insert(ordersTable).values(Order)
    return "Order created successfully";
}

export const updateOrderService = async (id: number, Order: TIorders) => {
    await db.update(ordersTable).set(Order).where(eq(ordersTable.id, id))
    return "Order updated successfully";
}

export const deleteOrderService = async (id: number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id))
    return "Order deleted successfully";
}