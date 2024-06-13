import { roleEnum } from './../drizzle/schema';
import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import 'dotenv/config'
import { JwtPayload } from 'jsonwebtoken';


export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token, secret);
        return decoded;   
    } catch (error: any) {
        throw new Error("Invalid token");
    }
}

interface JWTPayload {
    id: number;
    email: string;
    role: string;
}


export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");
    if (!token) return c.json({ error: "token not provided" }, 401);

    try {
        const decoded = await verifyToken(token , process.env.SECRET as string) as JwtPayload;
// console.log(decoded.role[0].role)
        if (!decoded) return c.json({ error: "Invalid token" }, 401);
    // const decodedRole = decoded.role[0].role;
    if(requiredRole == "both"){
        
        return next()
    }
        if (decoded.role[0].role !== requiredRole) return c.json({ error: "Unauthorized" }, 401);
    
        return next();
    } catch (err) {
        return c.json({ error: (err as Error).message }, 401);
    }
}

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");
    // await next();



export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");

export const userAdminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "both");

    // await next();

