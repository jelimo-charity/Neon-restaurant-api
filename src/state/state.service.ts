import db from '../drizzle/db'
import { TSstate,TIstate, stateTable, usersTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
//Get all users

export const getStatesService = async (limit?: number):Promise<TSstate[]> => {
    if(limit) {
        return await db.select().from(stateTable)
    }
    return await db.select().from(stateTable);
}
//get a single state

export const getStateService = async (id: number): Promise<TSstate | undefined> => {
    const stateArray = await db.select().from(stateTable).where(eq(stateTable.id, id)).execute();

    if (stateArray.length === 0) {
        return undefined;
    }

    return stateArray[0];
}

//create a new state
export const createStateService = async (state: TIstate) => {
    await db.insert(stateTable).values(state)
    return "state created successfully";
}

export const updateStateService = async (id: number, state: TIstate) => {
    await db.update(stateTable).set(state).where(eq(stateTable.id, id))
    return "state updated successfully";
}

export const deleteStateService = async (id: number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id))
    return "state deleted successfully";
}

