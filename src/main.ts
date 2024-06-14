import { Context, Hono } from "hono"; 
import "dotenv/config"
import {serve} from '@hono/node-server'
import { HTTPException } from "hono/http-exception";
import { userRouter } from "./users/user.router.js";
import {html, raw} from 'hono/html'
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

// app.get("ok", (c: Context) =>{
//     return c.text("the server is running")
// })

app.get('/ok', (c: Context) => {    
    return c.html(
        html`
        <style>
            body, html {
                height: 100%;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
            }
            .container {
                text-align: center;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                margin-bottom: 10px;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
        <div class="container">
            <h1>Welcome to the Charity Jelimo Restaurant Management API</h1>
            <ul>
                <li><b>Message:</b> Welcome to the Charity Jelimo API</li>
                <li><b>Author:</b> Charity Jelimo</li>
                <li><b>Version:</b> 1.0</li>
                <li><b>Description:</b> This is a simple API for a restaurant management system</li>
                <li><b>GitHub:</b> <a href="https://github.com/your-github/restaurant_api">GitHub link</a></li>
            </ul>
        </div>
        `
    );
});

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