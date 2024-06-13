
import { Hono } from "hono";
import { getMoreRestaurantsInfo, getOrderDetails, getcityStateInfo } from "./cityState.controller"
import { zValidator } from "@hono/zod-validator";
import { getOrderDetailsService } from "./cityState.service";


export const cityStateRouter = new Hono();
cityStateRouter.get("/cityState", getcityStateInfo)



export const restaurantDetailsRouter= new Hono();
restaurantDetailsRouter.get("/resDetails", getMoreRestaurantsInfo)


export const orderDetailsRouter = new Hono();
orderDetailsRouter.get("/orderDetails", getOrderDetails)


