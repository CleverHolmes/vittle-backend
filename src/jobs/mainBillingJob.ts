import app from "../app";
import { Application } from "@feathersjs/feathers";
import moment from "moment";
import billingTemplate from "../email-templates/billing/main-billing-job";

export default (app: Application) => {
  app.get("agenda").define("mainBillingJob", async (job: any) => {
    //@ts-ignore
    // const { orderId, paymentIntentId } = job.attrs.data;

    //console.log("Inside main billing job");

    try {
      const activeSubs = await app.service("subscriptions").find({
        query: {
          status: "active",
          $select: ["_id", "status", "stripe_customer_id", "autoRenew"],
        },
      });

      //console.log(activeSubs);

      const weekOf = `${moment()
        .add(1, "w")
        .startOf("isoWeek")
        .format("MMMM D")}-${moment()
        .add(1, "w")
        .startOf("isoWeek")
        .add(5, "d")
        .format("D")}`;

      activeSubs.data.forEach(async (element: any) => {
        await app.get("agenda").schedule("in 10 seconds", "chargeJob", {
          subscriptionId: element._id.toString(),
          selectedWeekStartDate: moment()
            .add(1, "w")
            .startOf("isoWeek")
            .format("YYYY-MM-DD"),
          stripeCustomerId: element.stripe_customer_id,
          autoRenew: element.autoRenew,
        });

        if (element.autoRenew) {
          await app
            .get("agenda")
            .schedule("in 10 seconds", "createAutoRenewOrderJob", {
              subscriptionId: element._id.toString(),
              selectedWeekStartDate: moment().add(2, "w").format("YYYY-MM-DD"),
            });
        }
      });

      // const usersWithAmount: any = [];

      // app.service("mailer").create({
      //   from: `Vittle <omar@vittle.ca>`,
      //   to: [
      //     "jivanyesh@gmail.com",
      //     "jeremy.bellefeuille@gmail.com",
      //     "omar@vittle.ca",
      //   ],
      //   subject: `Billing summary for week of ${weekOf}`,
      //   html: billingTemplate({
      //     weekOf,
      //     usersWithAmount,
      //   }),
      // });

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in mainBillingJob.ts");
      //console.log("Error in try/catch");
      //console.log(error);
      //@ts-ignore
      job.fail(error.toString());
    }
  });
};
