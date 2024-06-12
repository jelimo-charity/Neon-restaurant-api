import db from '../drizzle/db'
import { TSuser,TIuser, usersTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
//Get all users

export const usersService = async (limit?: number):Promise<TSuser[]  | null> => {
    if(limit) {
        return await db.select().from(usersTable)
    }
    return await db.select().from(usersTable);
}

export const getUserService = async (id: number): Promise<TSuser | undefined> => {
    const userArray = await db.select().from(usersTable).where(eq(usersTable.id, id)).execute();

    if (userArray.length === 0) {
        return undefined;
    }

    return userArray[0];
}
//get a single user

// export const getUserService = async(id: number): Promise<TSuser | undefined> =>{
//     return await db.select().from(usersTable). where(eq(usersTable.id, id))
// }

//create a new user
export const createUserService = async (user: TIuser) => {
    await db.insert(usersTable).values(user)
    return "User created successfully";
}

export const updateUserService = async (id: number, user: TIuser) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "User deleted successfully";
}

