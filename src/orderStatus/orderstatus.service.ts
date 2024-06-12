import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIorderStatus,TSorderStatus, orderStatusTable } from "../drizzle/schema";

export const orderStatusService = async (limit?: number): Promise<TSorderStatus[] | null> => {
    if (limit) {
        return await db.select().from(orderStatusTable)
    }
    return await db.select().from(orderStatusTable);
}


export const getOrderStatusService = async (id: number): Promise<TSorderStatus | undefined> => {
    const orderStatusArray = await db.select().from(orderStatusTable).where(eq(orderStatusTable.id, id)).execute();

    if (orderStatusArray.length === 0) {
        return undefined;
    }

    return orderStatusArray[0];
}

export const createOrderStatusService = async (OrderStatus: TIorderStatus) => {
    await db.insert(orderStatusTable).values(OrderStatus)
    return "OrderStatus created successfully";
}

export const updateOrderStatusService = async (id: number, OrderStatus: TIorderStatus) => {
    await db.update(orderStatusTable).set(OrderStatus).where(eq(orderStatusTable.id, id))
    return "OrderStatus updated successfully";
}

export const deleteOrderStatusService = async (id: number) => {
    await db.delete(orderStatusTable).where(eq(orderStatusTable.id, id))
    return "OrderStatus deleted successfully";
}