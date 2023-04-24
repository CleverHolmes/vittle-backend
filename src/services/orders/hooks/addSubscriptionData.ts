import moment from "moment";

export default async (context: any) => {
  //console.log("Going into order:after addMealPlanDataToSubscription");

  if (context.result.hasOwnProperty("autoRenewOrder")) {
    if (context.result.autoRenewOrder) {
      return context;
    }
  }

  if (context.result.type === "giftCard") {
    return context;
  }

  if (!context.result.customer.emailAddress) {
    return context;
  }

  const userExists = await context.app.service("users").find({
    query: {
      email: context.result.customer.emailAddress,
    },
  });

  //console.log(userExists);

  if (userExists.total === 0) {
    return context;
  }

  if (context.result.type === "mealPlan") {
    try {
      const patchUser = await context.app
        .service("users")
        .patch(userExists.data[0]._id, {
          mealPlan: context.result.selectedMealPlan,
          mealPlanName: context.result.selectedMealPlanName,
        });
    } catch (error) {
      //console.log(error);
    }
  }

  try {
    await context.app
      .service("subscriptions")
      .patch(userExists.data[0].subscriptionId, {
        status: "active",
        deliveryType: context.result.delivery.type,
        deliveryTime: context.result.delivery.time,
        autoRenew:
          context.result.type !== "mealPlan" ? false : context.result.autoRenew,
      });
  } catch (error) {
    //console.log("ERROR INSIDE SUB PATCH");
    //console.log(error);
  }

  return context;
};
