import moment from "moment";

import orderReceiptTemplate from "../../email-templates/order/refund";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";

export default async (context: any) => {
  //console.log("Going into after refund create");

  const orders = await context.app
    .service("orders")
    .find({ query: { paymentIntentId: context.result.payment_intent } });

  const order = orders.data[0];

  let cardLast4 = "";
  let cardBrand = "";

  if (order.type !== "mealPlan") {
    if (order.paymentType === "card") {
      const paymentIntent = await context.app
        .service("/stripe/payment-intent")
        .get(context.result.payment_intent);

      // //console.log(paymentIntent);

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
    const mailSent = await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      // to: "jeremy.bellefeuille@gmail.com",
      to: [order.customer.emailAddress],
      cc: [
        "jeremy.bellefeuille@gmail.com",
        "jivanyesh@gmail.com",
        "omar@vittle.ca",
      ],
      subject: `${
        order.customer.language === "EN"
          ? "Your order has been refunded"
          : "Votre commande a été remboursée"
      }, ${order.customer.firstName}`,
      //@ts-ignore
      html: orderReceiptTemplate({
        //@ts-ignore
        orderId: order._id,
        firstName: order.customer.firstName,
        language: order.customer.language,
        orderDate: moment(order.createdAt).format(
          `MMMM D[,] YYYY [${
            order.customer.language === "FR" ? "à" : "at"
          }] HH:mm a`
        ),
        lineItems: order.lineItems,
        total: order.total,

        customerLanguage: order.customer.language,
        deliveryDate: order.delivery.date,
        deliveryType: order.delivery.type,

        address: order.address,

        orderLineItems: calculateOrderLineItems({
          lineItems: order.lineItems,
          deliveryType: order.delivery.type,
          deliveryTime: order.delivery.time,
          selectedWeek: order.selectedWeek,
          selectedMealPlan: order.selectedMealPlan,
          selectedMealPlanName: order.selectedMealPlanName,
        }),

        cardLast4,
        cardBrand,
      }),
    });

    //console.log(mailSent);
  } catch (error) {
    //console.error(error);
  }
};
