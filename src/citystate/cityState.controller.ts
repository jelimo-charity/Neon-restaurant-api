import { getAddressDetailsService, getOrderDetailsService, getRestaurantDetailsService, getcityStateService } from "./cityState.service";
import { Context } from "hono";

export const getcityStateInfo = async(c:Context) => {
 
    const cityStateInfo = await getcityStateService();
    if (cityStateInfo == undefined) {
        return c.text("restaurantsInfo not found", 404);
    }
    return c.json(cityStateInfo, 200);
  }

 

export const getMoreRestaurantsInfo = async (c: Context) => {
    const cityStateInfo = await getcityStateService();
    if (!cityStateInfo) {
        return c.text("City and State Info not found", 404);
    }

    const addressDetails = await getAddressDetailsService();
    if (!addressDetails) {
        return c.text("Address Details not found", 404);
    }

    const restaurantDetails = await getRestaurantDetailsService();
    if (!restaurantDetails) {
        return c.text("Restaurant Details not found", 404);
    }

    const orderDetails = await getOrderDetailsService();
    if (!orderDetails) {
        return c.text("Order Details not found", 404);
    }

    return c.json({
        cityStateInfo,
        addressDetails,
        restaurantDetails,
        orderDetails,
    }, 200);
};


//orders

// order.controller.ts


export const getOrderDetails = async (c: Context) => {
    try {
        const orderDetails = await getOrderDetailsService();

        if (!orderDetails || orderDetails.length === 0) {
            return c.text("Order details not found", 404);
        }

        return c.json(orderDetails, 200);
    } catch (error) {
        console.error("Error fetching order details:", error);
        return c.text("Internal Server Error", 500);
    }
};
