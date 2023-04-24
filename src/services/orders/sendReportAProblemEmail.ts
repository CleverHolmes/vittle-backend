import moment from "moment";
import reportAProblemTemplate from "../../email-templates/order/report-a-problem";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";

export default async (context: any) => {
  //console.log("Going into after patch report a problem");

  if (
    !context.data.hasOwnProperty("reportedAProblem") &&
    !context.data.hasOwnProperty("reportAProblemMessage")
  ) {
    return context;
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
      subject: `${
        order.customer.language === "EN"
          ? `${order.customer.firstName} reported a problem with their order`
          : "Nous avons annulé votre commande"
      }`,
      //@ts-ignore
      html: reportAProblemTemplate({
        //@ts-ignore
        orderId: order._id,
        firstName: order.customer.firstName,
        language: order.customer.language,
        orderDate: moment(order.createdAt).format(
          `MMMM D[,] YYYY [at] HH:mm a`
        ),
        reportedAt: moment(order.reportedAt).format(
          `MMMM D[,] YYYY [at] HH:mm a`
        ),
        reportedAtMessage: order.reportAProblemMessage,

        customerLanguage: order.customer.language,
        deliveryDate: order.delivery.date,
        deliveryType: order.delivery.type,
      }),
    });
  } catch (error) {
    //console.log("Error: report a problem email");
    //console.log(error);
  }

  return context;
};
