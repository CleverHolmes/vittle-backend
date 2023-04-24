import moment from "moment";

export default async (context: any) => {
  //console.log("hitting subscription activation job hook");

  if (context.result.hasOwnProperty("autoRenewOrder")) {
    if (context.result.autoRenewOrder) {
      return context;
    }
  }

  if (context.result.type !== "mealPlan") {
    return context;
  }

  const activationDate = moment(context.result.selectedWeekStartDate)
    .add(3, "d")
    .hour(23)
    .minutes(59)
    .toDate();

  //console.log("Going into create subscription activation job hook");

  const jobReturn = await context.app
    .get("agenda")
    .schedule(activationDate, "activateSubscriptionJob", {
      orderId: context.result._id.toString(),
      // paymentIntentId: context.result.paymentIntentId,
      // customerId: context.params.user._id,
      // subscriptionId: context.result.subscriptionId.toString(),
    });

  try {
  } catch (error) {
    //console.error(error);
  }
};
