import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIstatusCatalog,TSstatusCatalog, statusCatalogTable } from "../drizzle/schema";

export const StatusCatalogsService = async (limit?: number): Promise<TSstatusCatalog[] | null> => {
    if (limit) {
        return await db.select().from(statusCatalogTable);

    }
    return await db.select().from(statusCatalogTable);
}

export const getStatusCatalogService = async (id: number): Promise<TSstatusCatalog | undefined> => {
    const statusCatalogArray = await db.select().from(statusCatalogTable).where(eq(statusCatalogTable.id, id)).execute();

    if (statusCatalogArray.length === 0) {
        return undefined;
    }

    return statusCatalogArray[0];
}


export const createStatusCatalogService = async (StatusCatalog: TIstatusCatalog) => {
    await db.insert(statusCatalogTable).values(StatusCatalog)
    return "StatusCatalog created successfully";
}

export const updateStatusCatalogService = async (id: number, StatusCatalog: TIstatusCatalog) => {
    await db.update(statusCatalogTable).set(StatusCatalog).where(eq(statusCatalogTable.id, id))
    return "StatusCatalog updated successfully";
}

export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(statusCatalogTable).where(eq(statusCatalogTable.id, id))
    return "StatusCatalog deleted successfully";
}