export default async function (context: any) {
  //console.log("GOING IN CREATE SUBSCRIPTION");
  //console.log(context.result);

  if (context.result.secondary) {
    return context;
  }

  const sub = await context.app.service("subscriptions").create({
    customerId: context.result._id,
    paymentMethod: "",
    amount: 0,
    status: "abandoned",
    deliveryType: "delivery",
    deliveryTime: "nightBefore",
  });

  //console.log(sub);

  context.data.subscriptionId = sub._id;

  try {
    await context.app.service("users").patch(context.result._id, {
      subscriptionId: sub._id,
    });
  } catch (error) {
    //console.log(error);
  }

  return context;
}
