import { HookContext } from "@feathersjs/feathers";
import app from "../../../app";
import giftCardAddedTemplate from "../../../email-templates/subscription/gift-card-added";

export async function sendGiftCardAddedOwnerEmail(data: any, context: any) {
  //console.log("going in sendGiftCardAddedOwnerEmail");

  try {
    await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: [
        "jeremy.bellefeuille@gmail.com",
        "omar@vittle.ca",
        "jivanyesh@gmail.com",
      ],
      // to: data.emailAddress,
      subject: `${data.customerName} added a gift card worth $${data.giftCardAmount}`,
      //@ts-ignore
      html: giftCardAddedTemplate({
        //@ts-ignore
        customerName: data.customerName,
        customerId: data.customerId,
        giftCardAmount: data.giftCardAmount,
        subscriptionId: data.subscriptionId,
      }),
    });
  } catch (error) {
    //console.log(error);
  }
}

export default async (context: any) => {
  //console.log(context.data);

  if (
    !context.data.hasOwnProperty("giftCardAdded") ||
    !context.data.hasOwnProperty("giftCardId")
  ) {
    return context;
  }

  const subId = context.params.user.subscriptionId;

  const giftCard = await app.service("gift-cards").get(context.data.giftCardId);

  //console.log(giftCard);

  //   return;

  try {
    sendGiftCardAddedOwnerEmail(
      {
        customerId: context.params.user._id,
        customerName:
          context.params.user.firstName + " " + context.params.user.lastName,
        giftCardAmount: giftCard.initialAmount,
        subscriptionId: subId,
      },
      context
    );

    // //console.log(mailSent);
  } catch (error) {
    //console.log("Inside sendPausedEmail");
    //console.error(error);
  }
};
