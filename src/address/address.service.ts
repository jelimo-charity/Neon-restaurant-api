import { addressTable } from './../drizzle/schema';
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIaddress, TSaddress } from "../drizzle/schema";

export const addressService = async (limit?: number): Promise<TSaddress[] | null> => {
    if (limit) {
        return await db.select().from(addressTable)
    }
    return await db.select().from(addressTable);
}

// export const usersService = async (limit?: number):Promise<TSuser[]  | null> => {
//     if(limit) {
//         return await db.select().from(usersTable)
//     }
//     return await db.select().from(usersTable);
// }

export const getAddressService = async (id: number): Promise<TSaddress | undefined> => {
    const addressArray = await db.select().from(addressTable).where(eq(addressTable.id, id)).execute();

    if (addressArray.length === 0) {
        return undefined;
    }

    return addressArray[0];
}

export const createAddressService = async (Address: TIaddress) => {
    await db.insert(addressTable).values(Address)
    return "Address created successfully";
}

export const updateAddressService = async (id: number, Address: TIaddress) => {
    await db.update(addressTable).set(Address).where(eq(addressTable.id, id))
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id))
    return "Address deleted successfully";
}