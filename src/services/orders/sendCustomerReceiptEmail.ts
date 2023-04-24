import moment from "moment";

import orderReceiptTemplate from "../../email-templates/order/order";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";
import getExtrasTotalOnWholeOrder from "../../modules/getExtrasTotalOnWholeOrder";

interface CustomerReceiptEmailProps {
  // emailTo: string;
  // orderId: string;
  order?: any;
  //handle non-card
  cardLast4: string;
  cardBrand: string;

  createdAt: any;

  showPaymentHoldMessage: boolean;
}

export async function sendCustomerReceipt(
  data: CustomerReceiptEmailProps,
  context: any
) {
  let orderDate = moment(data.createdAt).format(
    `MMMM D[,] YYYY [${
      data.order.customer.language === "FR" ? "à" : "at"
    }] HH:mm a`
  );

  let showPaymentHoldMessage = data.showPaymentHoldMessage;

  const mailSent = await context.app.service("mailer").create({
    from: `Vittle <omar@vittle.ca>`,
    cc: [
      // "jeremy.bellefeuille@gmail.com",
      // "omar@vittle.ca",
      "jivanyesh@gmail.com",
    ],
    to: data.order.customer.emailAddress,
    subject: `${
      data.order.customer.language === "EN"
        ? "Thanks for ordering"
        : "Merci d'avoir commandé"
    }, ${data.order.customer.firstName}`,
    //@ts-ignore
    html: orderReceiptTemplate({
      //@ts-ignore
      orderId: data.order._id,
      firstName: data.order.customer.firstName,
      language: data.order.customer.language,
      orderDate,
      lineItems: data.order.lineItems,
      total: data.order.total,
      orderType: data.order.type,

      customerLanguage: data.order.customer.language,
      deliveryDate: data.order.delivery.date,
      deliveryType: data.order.delivery.type,

      address: data.order.address,

      orderLineItems: calculateOrderLineItems({
        lineItems: data.order.lineItems,
        deliveryType: data.order.delivery.type,
        deliveryTime: data.order.delivery.time,
        selectedWeek: data.order.selectedWeek,
        selectedMealPlan: data.order.selectedMealPlan,
        selectedMealPlanName: data.order.selectedMealPlanName,
      }),

      hasExtras: getExtrasTotalOnWholeOrder(data.order.lineItems) > 0,
      extraAmount: calculateOrderLineItems({
        lineItems: data.order.lineItems,
        deliveryType: data.order.delivery.type,
        deliveryTime: data.order.delivery.time,
        selectedWeek: data.order.selectedWeek,
        selectedMealPlan: data.order.selectedMealPlan,
        selectedMealPlanName: data.order.selectedMealPlanName,
      }).extras,

      showPaymentHoldMessage,

      //handle non-card
      cardLast4: data.cardLast4,
      cardBrand: data.cardBrand,
    }),
  });
}

export default async (context: any) => {
  //console.log("Going into after create");

  const order = context.result;

  let cardLast4 = "";
  let cardBrand = "";
  let showPaymentHoldMessage = true;

  if (order.type !== "mealPlan") {
    showPaymentHoldMessage = false;

    if (order.paymentType === "card") {
      const paymentIntent = await context.app
        .service("/stripe/payment-intent")
        .get(context.result.paymentIntentId);

      cardLast4 =
        paymentIntent.charges.data[0].payment_method_details.card.last4;
      cardBrand =
        paymentIntent.charges.data[0].payment_method_details.card.brand;
    }
  }

  if (order.customer.language) {
    moment.locale(order.customer.language.toLowerCase());
  }

  try {
    sendCustomerReceipt(
      {
        order: order,
        cardBrand,
        cardLast4,
        createdAt: context.result.createdAt,
        showPaymentHoldMessage,
      },
      context
    );

    // //console.log(mailSent);
  } catch (error) {
    //console.log("Inside sendCustomerReceipt");
    //console.error(error);
  }
};
