import moment from "moment";
import newOrderTemplate from "../../email-templates/order/owner";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";

export default async (context: any) => {
  //console.log("Going into after create order placed activity");

  try {
    const activity = await context.app.service("activities").create({
      actionOn: context.params.user._id,
      actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      action: "order-placed",
      data: {
        firstName: context.params.user.firstName,
        lastName: context.params.user.lastName,
        orderAmount: context.tap,
      },
    });
  } catch (error) {
    //console.log("Error: create order placed activity");
    //console.log(error);
  }

  //   if (!context.result.customer.emailAddress) {
  //     return context;
  //   }

  //   const userExists = await context.app.service("users").find({
  //     query: {
  //       email: context.result.customer.emailAddress,
  //     },
  //   });

  //   if (userExists.total === 0) {
  //     //create user
  //     context.app.service("users").create({
  //       firstName: context.result.customer.firstName,
  //       lastName: context.result.customer.lastName,
  //       phone: context.result.customer.phone,
  //       email: context.result.customer.emailAddress,
  //       address: [{ ...context.result.address }],
  //       notes: "",
  //       acceptsMarketing: true,

  //       settings: {
  //         language: context.result.customer.language || "EN",
  //       },
  //       secondary: false,
  //       secondaryAccounts: [],
  //       dontSendSetPasswordEmail: true,
  //       dontSendVerifyEmail: true,
  //     });
  //   } else {
  //     await context.app.service("orders").patch(context.result._id, {
  //       customerId: userExists.data[0]._id,
  //     });
  //   }

  // const paymentIntent = await context.app
  //   .service("users")
  //   .get(context.result.paymentIntentId);

  return context;
};
