import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIcategory, TScategory, categoryTable } from "../drizzle/schema";

export const CategoryService = async (limit?: number): Promise<TScategory[] | null> => {
    if (limit) {
        return await db.select().from(categoryTable);
    }
    return await db.select().from(categoryTable);
}

export const getCategoryService = async (id: number): Promise<TScategory | undefined> => {
    const categoryArray = await db.select().from(categoryTable).where(eq(categoryTable.id, id)).execute();

    if (categoryArray.length === 0) {
        return undefined;
    }

    return categoryArray[0];
}
export const createCategoryService = async (Category: TIcategory) => {
    await db.insert(categoryTable).values(Category)
    return "Category created successfully";
}

export const updateCategoryService = async (id: number, Category: TIcategory) => {
    await db.update(categoryTable).set(Category).where(eq(categoryTable.id, id))
    return "Category updated successfully";
}

export const deleteCategoryService = async (id: number) => {
    await db.delete(categoryTable).where(eq(categoryTable.id, id))
    return "Category deleted successfully";
}