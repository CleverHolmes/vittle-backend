import { HookContext } from "@feathersjs/feathers";
import autoRenewStatusChangedTemplate from "../../../email-templates/subscription/auto-renew-status";

export async function sendAutoRenewStatusChangedEmail(data: any, context: any) {
  //console.log("going in sendAutoRenewStatusChangedEmail");

  try {
    await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: [
        "jeremy.bellefeuille@gmail.com",
        "omar@vittle.ca",
        "jivanyesh@gmail.com",
      ],
      // to: data.emailAddress,
      subject: `${data.customerName} changed their auto-renew preference`,
      //@ts-ignore
      html: autoRenewStatusChangedTemplate({
        //@ts-ignore
        customerName: data.customerName,
        customerId: data.customerId,
        autoRenew: data.autoRenew,
      }),
    });
  } catch (error) {
    //console.log(error);
  }
}

export default (context: any) => {
  //console.log(context.data);

  if (!context.data.hasOwnProperty("autoRenew")) {
    return context;
  }

  try {
    sendAutoRenewStatusChangedEmail(
      {
        customerId: context.params.user._id,
        customerName:
          context.params.user.firstName + " " + context.params.user.lastName,
        autoRenew: context.data.autoRenew,
      },
      context
    );

    // //console.log(mailSent);
  } catch (error) {
    //console.log("Inside sendPausedEmail");
    //console.error(error);
  }
};
