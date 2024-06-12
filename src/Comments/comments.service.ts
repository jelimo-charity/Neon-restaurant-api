import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIcomments, TScomments, commentsTable } from "../drizzle/schema";

export const CommentsService = async (limit?: number): Promise<TScomments[] | null> => {
    if (limit) {
        return await db.select().from(commentsTable);
    }
    return await db.select().from(commentsTable);
}

export const getCommentService = async (id: number): Promise<TScomments | undefined> => {
    const commentArray = await db.select().from(commentsTable).where(eq(commentsTable.id, id)).execute();

    if (commentArray.length === 0) {
        return undefined;
    }

    return commentArray[0];
}

export const createCommentService = async (Comment: TIcomments) => {
    await db.insert(commentsTable).values(Comment)
    return "Comment created successfully";
}

export const updateCommentService = async (id: number, Comment: TIcomments) => {
    await db.update(commentsTable).set(Comment).where(eq(commentsTable.id, id))
    return "Comment updated successfully";
}

export const deleteCommentService = async (id: number) => {
    await db.delete(commentsTable).where(eq(commentsTable.id, id))
    return "Comment deleted successfully";
}