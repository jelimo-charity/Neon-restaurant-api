import db from "../drizzle/db";

export const getcityStateService = async () => {
    return await db.query.cityTable.findMany({
      columns: {
        name: true,
      },
      with: {
        state: {
          columns: {
            name: true,
            code: true
          }
        },
        
      },
    });
  }

  //address and its info

export const getAddressDetailsService = async () => {
    return await db.query.addressTable.findMany({
        columns: {
            street_address_1: true,
            street_address_2: true,
            zip_code: true,
            delivery_instructions: true,
        },
        with: {
            city: {
                columns: {
                    name: true,
                },
                with: {
                    state: {
                        columns: {
                            name: true,
                            code: true,
                        },
                    },
                },
            },
            user: {
                columns: {
                    name: true,
                    email: true,
                },
            },
        },
    });
};


// restaurant details

export const getRestaurantDetailsService = async () => {
    return await db.query.restaurantTable.findMany({
        columns: {
            name: true,
            street_address: true,
            zip_code: true,
        },
        with: {
            city: {
                columns: {
                    name: true,
                },
              },
            restaurantowner: {
                columns: {
                    id: true,
                },
                with: {
                    user: {
                        columns: {
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
};


//order details
export const getOrderDetailsService = async () => {
    return await db.query.ordersTable.findMany({
        columns: {
            estimated_delivery_time: true,
            actual_delivery_time: true,
            price: true,
            discount: true,
            final_price: true,
        },
        with: {
            user: {
                columns: {
                    name: true,
                    email: true,
                },
            },
            driver: {
                columns: {
                    car_make: true,
                    car_model: true,
                    car_year: true,
                },
                
            },
            address: {
                columns: {
                    street_address_1: true,
                    street_address_2: true,
                    zip_code: true,
                },
                with: {
                    city: {
                        columns: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
};
