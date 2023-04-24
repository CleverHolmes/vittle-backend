import moment from "moment";
import currency from "currency.js";
import giftCardPurchaseRecipientTemplate from "../../../email-templates/order/gift-card-recipient";

export default async (context: any) => {
  //console.log("Going into after create gift card purchase email");

  if (context.result.type !== "giftCard") {
    return context;
  }

  const order = context.result;

  //console.log(order);

  try {
    const mailSent = await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: context.result.customer.recipeientEmailAddress,
      // to: "omar@vittle.ca",
      cc: [
        "jeremy.bellefeuille@gmail.com",
       "jivanyesh@gmail.com",
       "omar@vittle.ca" 
    ],
      subject: `${context.result.customer.firstName} gifted you a ${currency(context.result.total).format()} gift card from Vittle`,
      //@ts-ignore
      html: giftCardPurchaseRecipientTemplate({
        //@ts-ignore
        orderId: order._id,
        customerFirstName: order.customer.firstName,
        customerLastName: order.customer.lastName,

        recipientFirstName:
          order.giftCardRecipientInformation.recipientFirstName,
        recipientLastName: order.giftCardRecipientInformation.recipientLastName,

        giftCardAmount: order.total,
        giftCardCode: order.giftCardCode,
        personalMessage: order.lineItems[0].personalMessage,
      }),
    });
  } catch (error) {
    //console.log("Error: cancel owner email");
    //console.log(error);
  }

  return context;
};
