import app from "../app";
import { Application } from "@feathersjs/feathers";
import moment from "moment";
import currency from "currency.js";
import { sendCustomerReceipt } from "../services/orders/sendCustomerReceiptEmail";

export default (app: Application) => {
  app.get("agenda").define("chargeJob", async (job: any, done: Function) => {
    //@ts-ignore
    const { subscriptionId, selectedWeekStartDate, stripeCustomerId } =
      job.attrs.data;

    //console.log("Inside single charge job");

    try {
      const Orders = await app.service("orders").Model;

      const consolidatedOrder = await Orders.aggregate([
        {
          $match: {
            subscriptionId,
            selectedWeekStartDate,
          },
        },

        {
          $group: {
            _id: "$subscriptionId",
            orderIds: {
              $push: "$_id",
            },
            totalAmount: { $sum: "$total" },
            orders: {
              $push: "$$ROOT",
            },
          },
        },
      ]).exec();

      //console.log("consolidated order");
      //console.log(consolidatedOrder);

      // if (consolidatedOrder.length == 0) {
      //   done();
      // }

      //get the payment method from subscription id;

      const paymentMethods = await app.service("/stripe/payment-method").find({
        query: {
          customer: stripeCustomerId,
          type: "card",
        },
      });

      if (!paymentMethods) {
        job.error("No payment methods found");
      }

      if (paymentMethods) {
        if (paymentMethods.data.length === 0)
          job.error("No payment methods found");
      }

      //console.log(paymentMethods);

      const charge = await app.service("/stripe/payment-intent").create({
        customer: stripeCustomerId,
        currency: "CAD",
        amount: currency(consolidatedOrder[0].totalAmount).intValue,
        confirm: true,
        payment_method: paymentMethods.data[0].id,
      });

      //console.log("Charge done");
      //console.log(charge);

      //add paymentintent id to all orders under this subscription
      await app.service("orders").patch(
        null,
        {
          paymentIntentId: charge.id,
        },
        {
          query: {
            _id: {
              $in: consolidatedOrder[0].orderIds,
            },
          },
        }
      );

      // change for secondaries
      //console.log(consolidatedOrder[0].orders[0]);

      // await sendCustomerReceipt(
      //   {
      //     order: consolidatedOrder[0].orders[0],
      //     cardLast4: paymentMethods.data[0].card.last4,
      //     cardBrand: paymentMethods.data[0].card.brand,
      //     createdAt: moment().toISOString(),

      //     showPaymentHoldMessage: false,
      //   },
      //   { app: app }
      // );

      // create job for send receipt email
      await app
        .get("agenda")
        .schedule("in 10 seconds", "createAutoRenewOrderJob", {
          subscriptionId,
          selectedWeekStartDate: moment(selectedWeekStartDate)
            .add(2, "w")
            .format("YYYY-MM-DD"),
        });

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in chargeJob.ts");
      //console.log("Error in try/catch");
      //console.log(error);
      //@ts-ignore
      job.fail(error.message ? error.message : error.toString());
    }
  });
};
