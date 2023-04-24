import moment from "moment";
import cancelOwnerTemplate from "../../email-templates/order/cancel-owner";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";

export default async (context: any) => {
  //console.log("Going into after patch cancel customer");

  if (
    !context.data.hasOwnProperty("cancelNote") &&
    !context.data.hasOwnProperty("cancelReason") &&
    !context.data.hasOwnProperty("cancelledByCustomer")
  ) {
    return context;
  }

  if (context.data.hasOwnProperty("cancelledByCustomer")) {
    if (!context.data.cancelledByCustomer) {
      return context;
    }
  }

  const orderObj = await context.app.service("orders").find({
    query: { _id: context.id },
  });

  //console.log(orderObj);

  if (orderObj.data.length === 0) {
    //console.log("Order not found");
    return context;
  }

  const order = orderObj.data[0];

  try {
    const mailSent = await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: "omar@vittle.ca",
      cc: ["jeremy.bellefeuille@gmail.com", "jivanyesh@gmail.com"],
      subject: `${order.customer.firstName} cancelled their order`,
      //@ts-ignore
      html: cancelOwnerTemplate({
        //@ts-ignore
        orderId: order._id,
        firstName: order.customer.firstName,
        language: order.customer.language,
        cancelledAt: moment(order.cancelledAt).format(
          `MMMM D[,] YYYY [at] HH:mm a`
        ),
        cancelReason: order.cancelReason,
        cancelNote: order.cancelNote || "",
        orderDate: moment(order.createdAt).format(
          `MMMM D[,] YYYY [at] HH:mm a`
        ),
        reportedAtMessage: order.reportAProblemMessage,

        customerLanguage: order.customer.language,
        deliveryDate: order.delivery.date,
        deliveryType: order.delivery.type,
      }),
    });
  } catch (error) {
    //console.log("Error: cancel owner email");
    //console.log(error);
  }

  return context;
};
