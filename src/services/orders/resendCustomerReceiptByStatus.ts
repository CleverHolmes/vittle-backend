import moment from "moment";

import orderReceiptTemplate from "../../email-templates/order/order";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";

import sendOrderAcceptedEmail from "./sendOrderAcceptedEmail";
import sendOrderCancelledEmail from "./sendOrderCancelledEmail";
import sendOrderRefundedEmail from "./sendOrderRefundedEmail";

import { sendCustomerReceipt } from "./sendCustomerReceiptEmail";

export default async (context: any) => {
  //console.log("Going into resendCustomerReceiptByStatus");

  if (!context.data.hasOwnProperty("emailReceipt")) {
    return context;
  }

  //console.log(context.id);

  try {
    const order = await context.app.service("orders").get(context.id);

    let paymentIntent,
      cardLast4 = "",
      cardBrand = "";

    if (!order) {
      return context;
    }
    if (order.type !== "mealPlan") {
      if (order.paymentType === "card") {
        paymentIntent = await context.app
          .service("/stripe/payment-intent")
          .get(order.paymentIntentId);

        //console.log(paymentIntent);

        cardLast4 =
          paymentIntent.charges.data[0].payment_method_details.card.last4;
        cardBrand =
          paymentIntent.charges.data[0].payment_method_details.card.brand;
      }
    }

    //console.log(order.status);

    if (order.status === "accepted") {
    } else if (order.status === "cancelled") {
    } else if (order.status === "processing") {
      //handle non-card
      try {
        sendCustomerReceipt(
          {
            order,
            cardBrand,
            cardLast4,
            createdAt: order.createdAt,
          },
          context
        );
      } catch (error) {
        //console.log("ERROR: inside send receipt by current status processing");
        //console.error(error);
      }
      //send receipt
    } else if (order.status === "") {
    }
  } catch (error) {
    //console.error(error);
  }
};
