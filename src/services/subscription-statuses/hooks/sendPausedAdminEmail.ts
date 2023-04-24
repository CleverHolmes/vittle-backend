import { HookContext } from "@feathersjs/feathers";
import moment from "moment";
import pausedSubscriptionTemplate from "../../../email-templates/subscription/paused";

interface PausedEmailProps {
  customerName: string;
  customerId: string;
  weekOf: string;
  autoRenewOn: boolean;
  autoRenewChargeDate: string;
  autoRenewWeek: string;
}

export async function sendPausedAdminEmail(
  data: PausedEmailProps,
  context: HookContext
) {
  //console.log("going in sendPausedAdminEmail");

  try {
    await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: [
        "jeremy.bellefeuille@gmail.com",
        "omar@vittle.ca",
        "jivanyesh@gmail.com",
      ],
      // to: data.emailAddress,
      subject: `${data.customerName} paused their meal plan for the week of ${data.weekOf}`,
      //@ts-ignore
      html: pausedSubscriptionTemplate({
        //@ts-ignore
        customerName: data.customerName,
        customerId: data.customerId,
        weekOf: data.weekOf,
        autoRenewOn: data.autoRenewOn,
        autoRenewChargeDate: data.autoRenewChargeDate,
        autoRenewWeek: data.autoRenewWeek,
      }),
    });
  } catch (error) {
    //console.log(error);
  }
}

export default async (context: HookContext) => {
  //console.log("Going into after pause sub create");

  const sub = await context.app
    .service("subscriptions")
    .get(context.params.user.subscriptionId);

  let autoRenewOn = false;
  let autoRenewChargeDate = moment(context.data.weekOf)
    .startOf("isoWeek")
    .add(3, "d")
    .format("MMMM D");
  let autoRenewWeek = `${moment(context.data.weekOf)
    .add(1, "w")
    .startOf("isoWeek")
    .format("MMMM D")}-${moment(context.data.weekOf)
    .add(1, "w")
    .startOf("isoWeek")
    .add(5, "d")
    .format("D")}`;

  if (sub.hasOwnProperty("autoRenew")) {
    if (sub.autoRenew) {
      autoRenewOn = true;
    }
  }

  try {
    sendPausedAdminEmail(
      {
        customerId: context.params.user._id,
        weekOf: `${moment(context.data.weekOf)
          .startOf("isoWeek")
          .format("MMMM D")}-${moment(context.data.weekOf)
          .startOf("isoWeek")
          .add(5, "d")
          .format("D")}`,
        customerName:
          context.params.user.firstName + " " + context.params.user.lastName,
        autoRenewOn,
        autoRenewChargeDate,
        autoRenewWeek,
      },
      context
    );

    // //console.log(mailSent);
  } catch (error) {
    //console.log("Inside sendPausedEmail");
    //console.error(error);
  }
};
