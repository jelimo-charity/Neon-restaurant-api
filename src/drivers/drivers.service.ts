import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIdrivers, TSdrivers, driversTable } from "../drizzle/schema";

export const driversService = async (limit?: number): Promise<TSdrivers[] | null> => {
    if (limit) {
        return await db.select().from(driversTable);
    }
    return await db.select().from(driversTable);
}

export const getDriverService = async (id: number): Promise<TSdrivers | undefined> => {
    const driverArray = await db.select().from(driversTable).where(eq(driversTable.id, id)).execute();

    if (driverArray.length === 0) {
        return undefined;
    }

    return driverArray[0];
}

export const createDriverService = async (Driver: TIdrivers) => {
    await db.insert(driversTable).values(Driver)
    return "Driver created successfully";
}

export const updateDriverService = async (id: number, Driver: TIdrivers) => {
    await db.update(driversTable).set(Driver).where(eq(driversTable.id, id))
    return "Driver updated successfully";
}

export const deleteDriverService = async (id: number) => {
    await db.delete(driversTable).where(eq(driversTable.id, id))
    return "Driver deleted successfully";
}