export default async function (context: any) {
  //console.log("Create Auto Capture Grocery Order");

  if (context.result.hasOwnProperty("autoRenewOrder")) {
    if (context.result.autoRenewOrder) {
      return context;
    }
  }

  if (context.result.type !== "grocery") {
    return context;
  }

  if (context.result.paymentType !== "card") {
    return context;
  }

  const jobReturn = await context.app
    .get("agenda")
    .schedule("in 12 hours", "autoCaptureGroceryOrder", {
      orderId: context.result._id,
      paymentIntentId: context.result.paymentIntentId,
    });

  //console.log(jobReturn);

  return context;
}
