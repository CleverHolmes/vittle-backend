import moment from "moment";

import orderAcceptedTemplate from "../../email-templates/order/accepted";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";

export default async (context: any) => {
  //console.log("Going into after accepted");

  if (!context.data.hasOwnProperty("capture")) {
    return context;
  }

  //console.log(context.result);

  const orderObj = await context.app.service("orders").find({
    query: { id: context.id },
  });

  //console.log(orderObj);

  if (orderObj.data.length === 0) {
    //console.log("Order not found");
    return context;
  }

  const order = orderObj.data[0];

  let cardLast4 =
    context.result.charges.data[0].payment_method_details.card.last4;
  let cardBrand =
    context.result.charges.data[0].payment_method_details.card.brand;

  //   if (order.paymentType === "card") {
  //     const paymentIntent = await context.app
  //       .service("/stripe/payment-intent")
  //       .get(order.paymentIntentId);

  //     //console.log(paymentIntent);

  // cardBrand = paymentIntent.charges.data[0].payment_method_details.card.brand;
  //   }

  if (order.customer.language) {
    moment.locale(order.customer.language.toLowerCase());
  }

  try {
    const mailSent = context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      // to: "jeremy.bellefeuille@gmail.com",
      to: order.customer.emailAddress,
      subject: `${
        order.customer.language === "EN"
          ? "Your order is being processed"
          : "Votre commande a été reçue"
      }`,
      //@ts-ignore
      html: orderAcceptedTemplate({
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
