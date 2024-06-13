import { Hono } from "hono"; 
import "dotenv/config"
import {serve} from '@hono/node-server'
import { HTTPException } from "hono/http-exception";
import { userRouter } from "./users/user.router.js";
import { stateRouter } from "./state/state.router.js";
import { cityRouter } from "./city/city.router.js";
import { addressRouter } from "./address/address.router.js";
import { categoryRouter } from "./category/category.router.js";
import { commentRouter } from "./Comments/comments.router.js";
import { driverRouter } from "./drivers/drivers.router.js";
import { menuRouter } from "./menuItem/menuItem.router.js";
import { orderMenuItemRouter } from "./orderMenu/orderMenu.router.js";
import { restuarantOwnerRouter } from "./restaurantOwner/restaurantOwner.router.js";
import { ordersRouter } from "./orders/orders.router.js";
import { restaurantRouter } from "./restaurant/restaurant.router.js";
import { orderStatusRouter } from "./orderStatus/orderstatus.router.js";
import { statusCatalogRouter } from "./statusCatalog/statusCatalog.router.js";
import { authRouter } from "./auth/auth.router.js";
import userOrderRouter from "./userOrders/userorder.router.js";
import restaurantMenuRouter from "./restaurantMenuItems/restaurantMenu.router.js";
import commentComplaintRouter from "./commentsComplaints/commentComplaint.router.js";
import { cityStateRouter, orderDetailsRouter, restaurantDetailsRouter } from "./citystate/cityStateRouter.js";

const app = new Hono().basePath('/api');

// default route 

app.get("ok", (c) =>{
    return c.text("the server is running")
})
app.route("/", authRouter)

app.route("/", restaurantDetailsRouter )
app.route("/", orderDetailsRouter)


app.route("/", cityStateRouter)
app.route("/", userRouter),
app.route("/", stateRouter),
app.route("/", cityRouter),
app.route("/", restaurantRouter)
app.route("/", categoryRouter)
app.route("/", menuRouter)
app.route("/", addressRouter)
app.route("/", commentRouter)
app.route("/", ordersRouter)
app.route("/", driverRouter)
app.route("/", orderMenuItemRouter)
app.route("/", orderStatusRouter)
app.route("/", restuarantOwnerRouter)
app.route("/", statusCatalogRouter)

app.route('/', userOrderRouter);
app.route('/', restaurantMenuRouter);
app.route("/", commentComplaintRouter)

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)

})

console.log(`server running at ${process.env.PORT}`)