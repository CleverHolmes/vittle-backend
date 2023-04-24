import app from "../app";
import { Application } from "@feathersjs/feathers";
import moment from "moment";

import calculateOrderLineItems from "../modules/calculateOrderLineItems";
import groupLineItemsByDay from "../modules/groupLineItemsByDay";
import getProductPlatingDate from "../modules/getProductPlatingDate";

export default (app: Application) => {
  app.get("agenda").define("createAutoRenewOrderJob", async (job: any) => {
    //@ts-ignore
    const { selectedWeekStartDate, subscriptionId } = job.attrs.data;

    //console.log("Inside createAutoRenewOrderJob job");

    const orderExistsForThatWeek = await app.service("orders").find({
      query: {
        selectedWeekStartDate,
        subscriptionId: "subscriptionId",
      },
    });

    if (orderExistsForThatWeek) {
      if (orderExistsForThatWeek.total > 0) {
        job.fail("User already has orders for that week");
      }
    }

    let weekStartDate = moment(selectedWeekStartDate)
      .startOf("isoWeek")
      .isoWeekday(1)
      .subtract(1, "d")
      .toISOString();

    let weekEndDate = moment(selectedWeekStartDate)
      .startOf("isoWeek")
      .add(5, "d")
      .toISOString();

    //console.log(weekStartDate);
    //console.log(weekEndDate);

    try {
      const products: any = await app
        .service("products")
        .Model.aggregate([
          {
            $match: {
              type: "Meals",
              $or: [
                {
                  $and: [
                    {
                      "availability.startDate": {
                        $gte: weekStartDate,
                      },
                    },
                    {
                      "availability.endDate": {
                        $lte: weekEndDate,
                      },
                    },
                  ],
                },
                {
                  "availability.startDate": {
                    $lte: weekStartDate,
                  },
                  frequency: "Every weekday",
                  noEndDate: true,
                },
                {
                  "availability.startDate": {
                    $gte: weekStartDate,
                    $lte: weekEndDate,
                  },
                  frequency: "This day only",
                },
              ],
            },
          },
        ])
        .exec();

      //console.log(products);

      const users: any = await app.service("users").find({
        query: {
          subscriptionId: subscriptionId,
        },
      });

      const primaryUser = users.data.findIndex(
        (user: any) => user.secondary === false
      );

      let orders: any = users.data.map((user: any) => {
        let lineItems = [];

        if (products) {
          // change second argument to "2", it should be "1"
          // const productsGroupedByDay = groupLineItemsByDay(products, 2);
          //
          // check meal plan of the user first;
          // loop through all products available grouped by day
          // for (const day in productsGroupedByDay) {
          //   if (
          //     productsGroupedByDay.hasOwnProperty.call(productsGroupedByDay, day)
          //   ) {
          //     const itemsInCurrentDay = productsGroupedByDay[day];
          //     if (day == "0") {
          //     }
          //   }
          // }

          let lineItems: any = [];
          let lineItemsGroupedByDay: any = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
          };

          [0, 1, 2, 3, 4].forEach((dayNumber: any) => {
            const currentDay = moment()
              .add(2, "w")
              .startOf("isoWeek")
              .add(dayNumber, "d")
              .format("YYYY-MM-DD");

            const productsForThatDay = products.filter(
              (e: any) =>
                //@ts-ignore
                getProductPlatingDate(2, e.availability, "date").format(
                  "YYYY-MM-DD"
                ) === currentDay
            );

            //console.log("Products for ", currentDay);
            //console.log(productsForThatDay);

            /*  
              // check meal plan of the current user
              
              // store details and conditions of the meal plan in a variable
              
              // check for preferences of the user
              
              // if preferences found
                
                    //check for substitutes on this product
                      
                    //if substitutes are present query those substitute products

                    // else assign the chef's choice dish

              // if no proferences assign dishes according to the plan.
            */

            if (user.selectedMealPlan === "1 meal per day") {
            }

            lineItemsGroupedByDay[dayNumber] = productsForThatDay;
          });
        }

        return {
          customer: {
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.email,
            phone: user.phone,
          },
          address: user.address,
          delivery: {
            date: moment(selectedWeekStartDate).toISOString(),
            type: "delivery",
            time: "nightBefore",
          },
          selectedWeekStartDate: selectedWeekStartDate,

          autoRenewOrder: true,

          // total: orderLineItems.total,
          // lineItems: cartItems,

          type: "mealPlan",

          status: "placed",
          paymentStatus: "authorized",
          fulfillmentStatus: "unfulfilled",

          paymentType: "card",
          //@ts-ignore
        };
      });

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in createAutoRenewOrderJob.ts");
      //console.log("Error in try/catch");
      //console.log(error);
      //@ts-ignore
      job.fail(error.toString());
    }
  });
};
