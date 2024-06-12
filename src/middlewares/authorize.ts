import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import 'dotenv/config'

// const secret = process.env.SECRET;

export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token, secret);
        return decoded;
    } catch (error: any) {
        throw new Error("Invalid token");
    }
}

export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");
    if (!token) return c.json({ error: "token not provided" }, 401);

    try {
        const decoded = await verifyToken(token, process.env.SECRET as string);

        if (!decoded) return c.json({ error: "Invalid token" }, 401);
    
        if (decoded.role !== requiredRole) return c.json({ error: "Unauthorized" }, 401);
    
        return next();
    } catch (err) {
        return c.json({ error: (err as Error).message }, 401);
    }
}

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");
    // await next();



export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");
    // await next();

