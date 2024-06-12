import { userRoleAuth } from './../middlewares/authorize';
import bcrypt from 'bcrypt';
import db from '../drizzle/db';
import { eq } from 'drizzle-orm';
import { AuthUsersTable, TSuser } from '../drizzle/schema';
import { usersTable } from '../drizzle/schema';
import { error } from 'console';
import  jwt   from 'jsonwebtoken'
import 'dotenv/config'

const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRESIN
export const registerUserService = async (user: TSuser) => {
    try {
        const userExist = await db.select().from(usersTable).where(eq(usersTable.email, user.email)).execute();

        // Check if userExist is an array and if it has any elements
        if (userExist.length > 0) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await db.insert(usersTable).values({
            name: user.name,
            contact_phone: user.contact_phone,
            phone_verified: user.phone_verified,
            email: user.email,
            email_verified: user.email_verified,
            confirmation_code: user.confirmation_code,
            password: hashedPassword
        }).execute();

        console.log(newUser);
        return 'User created successfully';
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in registerUserService:", error);
        throw new Error("Error creating user");
    }
}


export const loginUserService = async ( email: string, password: string) =>{
    const userArray = await db.select().from(usersTable).where(eq(usersTable.email, email)).execute()

    if (userArray.length === 0) {
        throw new Error("Invalid credentials");
    }
    const user = userArray[0];
    if (!user){
        throw error ("invalid credentials")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid){
        throw error ("invalid credentials, try again")
    }
    const userRole = await db.select().from(AuthUsersTable).where(eq(AuthUsersTable.userId, user.id))
    if(!userRole) {
        throw error("user not found")
    }
    const token = jwt.sign({id: user.id, email: user.email, role: userRole }, secret!, {
        expiresIn
    })
    return {token, user}
}