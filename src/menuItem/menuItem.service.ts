import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TImenuItem, TSmenuItem, menuItemTable } from "../drizzle/schema";

export const menuItemService = async (limit?: number): Promise<TSmenuItem[] | null> => {
    if (limit) {
        return await db.select().from(menuItemTable)
    }
    return await db.select().from(menuItemTable);
}
export const getmenuItemService = async (id: number): Promise<TSmenuItem | undefined> => {
    const menuItemArray = await db.select().from(menuItemTable).where(eq(menuItemTable.id, id)).execute();

    if (menuItemArray.length === 0) {
        return undefined;
    }

    return menuItemArray[0];
}

export const createmenuItemService = async (menu: TImenuItem) => {
    await db.insert(menuItemTable).values(menu)
    return "menu created successfully";
}

export const updatemenuItemService = async (id: number, menu: TImenuItem) => {
    await db.update(menuItemTable).set(menu).where(eq(menuItemTable.id, id))
    return "menu updated successfully";
}

export const deletemenuItemService = async (id: number) => {
    await db.delete(menuItemTable).where(eq(menuItemTable.id, id))
    return "menu deleted successfully";
}