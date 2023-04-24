import moment from "moment";
import currency from "currency.js";
// import whatYouAreEatingTemplate from "../../../email-templates/order/whatYouAreEating";

// export function sendWhatYouAreEatingEmail(data: any) {}

export default async (context: any) => {
  //console.log(context.params.query);
  if (
    !context.params.query.hasOwnProperty("delivery") &&
    !context.params.query.hasOwnProperty("weekStartDate") &&
    !context.params.query.hasOwnProperty("todaysDate")
  ) {
    return context;
  }

  //console.log("IN Delivery Data hook");
  //console.log("query");
  //console.log(context.params.query);

  let dayDishesToBeDeliveredFor =
    moment(context.params.query.todaysDate).isoWeekday() === 7
      ? 0
      : moment(context.params.query.todaysDate).isoWeekday() - 1;

  let matchObj: any = {
    selectedWeekStartDate: context.params.query.weekStartDate,
  };

  matchObj[`lineItemsByDay.${dayDishesToBeDeliveredFor}`] = {
    $gte: { $size: 1 },
  };

  //console.log("match");
  //console.log(matchObj);

  const orders = await context.app
    .service("orders")
    .Model.aggregate([
      {
        $match: matchObj,
      },
      {
        $addFields: {
          lineItemsForTheDayTotalQuantity: {
            $sum: `$lineItemsByDay.${dayDishesToBeDeliveredFor}.quantity`,
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customerId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "customerId",
          foreignField: "customerId",
          as: "subscription",
        },
      },
      {
        $addFields: {
          assignedTo: "$subscription.assignedTo",
        },
      },
      {
        $unwind: "$assignedTo",
      },
    ])
    .exec();

  //console.log("orders");
  // //console.log(orders);

  if (orders.length > 0) {
    //console.log("has order delivery");
    context.result = orders;
  } else {
    context.error = new Error("Not found");
  }

  return context;
};
