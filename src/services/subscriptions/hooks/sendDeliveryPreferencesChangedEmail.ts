import { HookContext } from "@feathersjs/feathers";
import deliveryPreferencesTemplate from "../../../email-templates/subscription/delivery-preferences";

export async function sendDeliveryPreferencesChangedEmail(
  data: any,
  context: any
) {
  //console.log("going in sendDeliveryPreferencesChangedEmail");

  try {
    await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: [
        "jeremy.bellefeuille@gmail.com",
        "omar@vittle.ca",
        "jivanyesh@gmail.com",
      ],
      // to: data.emailAddress,
      subject: `${data.customerName} changed their delivery preferences`,
      //@ts-ignore
      html: deliveryPreferencesTemplate({
        //@ts-ignore
        customerName: data.customerName,
        customerId: data.customerId,
        deliveryTime: data.deliveryTime,
        deliveryType: data.deliveryType,
      }),
    });
  } catch (error) {
    //console.log(error);
  }
}

export default (context: any) => {
  //console.log(context.data);

  if (
    !context.data.hasOwnProperty("deliveryType") ||
    !context.data.hasOwnProperty("deliveryTime")
  ) {
    return context;
  }

  const subId = context.params.user.subscriptionId;

  try {
    sendDeliveryPreferencesChangedEmail(
      {
        customerId: context.params.user._id,
        customerName:
          context.params.user.firstName + " " + context.params.user.lastName,
        deliveryTime: context.data.deliveryTime,
        deliveryType: context.data.deliveryType,
      },
      context
    );

    // //console.log(mailSent);
  } catch (error) {
    //console.log("Inside sendPausedEmail");
    //console.error(error);
  }
};
