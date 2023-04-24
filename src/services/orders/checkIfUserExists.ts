import moment from "moment";
import newOrderTemplate from "../../email-templates/order/owner";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";

export default async (context: any) => {
  //console.log("Going into after check if user exists");

  if (context.result.hasOwnProperty("autoRenewOrder")) {
    if (context.result.autoRenewOrder) {
      return context;
    }
  }


  if (!context.result.customer.emailAddress) {
    return context;
  }

  const userExists = await context.app.service("users").find({
    query: {
      email: context.result.customer.emailAddress,
    },
  });

  if (userExists.total === 0) {
    //create user
    context.app.service("users").create({
      firstName: context.result.customer.firstName,
      lastName: context.result.customer.lastName,
      phone: context.result.customer.phone,
      email: context.result.customer.emailAddress,
      address: context.result.hasOwnProperty('address') ? [{ ...context.result.address }] : [],
      notes: "",
      acceptsMarketing: true,

      settings: {
        language: context.result.customer.language || "EN",
      },
      secondary: false,
      secondaryAccounts: [],
      dontSendSetPasswordEmail: true,
      dontSendVerifyEmail: true,
    });

    return context;
  }

  await context.app.service("orders").patch(context.result._id, {
    customerId: userExists.data[0]._id,
  });

  return context;
};
