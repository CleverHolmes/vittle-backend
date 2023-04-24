export default async function (context: any) {
  //console.log("GOING IN CREATE STRIPE CUSTOMER");

  if (context.result.secondary) {
    return context;
  }

  //console.log(context.data);
  //console.log(context.data.subscriptionId);

  try {
    const customer = await context.app.service("/stripe/customer").create({
      metadata: {
        customerId: context.result._id.toString(),
        subscriptionId: context.data.subscriptionId.toString(),
      },
      email: context.result.email,
      name: context.result.firstName + " " + context.result.lastName,
      phone: context.result.phone,
    });

    //console.log(customer);
  } catch (error) {
    //console.log("ERROR IN CREATE STRIPE CUSTOMER");
    //console.log(error);
  }

  return context;
}
