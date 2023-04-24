import moment from "moment";
import currency from "currency.js";
import whatYouAreEatingTemplate from "../../../email-templates/order/whatYouAreEating";

export function sendWhatYouAreEatingEmail(data: any) {}

export default async (context: any) => {
  //console.log("Going into what you're eating email");
  //console.log(context.result.type);

  const order = context.result;

  if (context.result.type !== "mealPlan") {
    return context;
  }

  //console.log("Going into what you're eating email after meal");

  if (order.customer.language) {
    moment.locale(order.customer.language.toLowerCase());
  }

  let subject = `${order.customer.firstName}, here's what you're eating`;

  try {
    const mailSent = context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: order.customer.emailAddress,
      cc: ["jivanyesh@gmail.com"],
      subject,
      //@ts-ignore
      html: whatYouAreEatingTemplate({
        headingPart: "here's what you're eating",
        orderId: context.result._id,
        firstName: order.customer.firstName,
        language: order.customer.language,
        orderDate: moment(context.result.createdAt).format(
          `MMMM D[,] YYYY [${
            order.customer.language === "FR" ? "à" : "at"
          }] HH:mm a`
        ),
        lineItems: context.result.lineItems,

        customerLanguage: context.result.customer.language,

        deliveryDate: context.result.delivery.date,
        deliveryType: context.result.delivery.type,
        deliveryTime: context.result.delivery.time,
        selectedWeek: context.result.selectedWeek,

        address: context.result.address,
      }),
    });

    //console.log(mailSent);
  } catch (error) {
    //console.error(error);
  }
};
