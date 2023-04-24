import app from "../../../app";

export default async (context: any) => {
  //console.log("in add gift card code");
  //console.log(context.data);

  if (
    !context.data.hasOwnProperty("code") ||
    !context.data.hasOwnProperty("addGiftCard")
  ) {
    return context;
  }

  //console.log("in add gift card code 2");

  const subId = context.params.user.subscriptionId;

  try {
    const giftCard = await app.service("gift-cards").find({
      query: {
        code: context.data.code,
      },
    });

    //console.log(giftCard);

    if (!giftCard) {
      context.error = new Error("Gift card is not valid");
      return context;
    }

    //@ts-ignore
    if (giftCard.data === []) {
      context.error = new Error("Gift card is not valid");
      return context;
    }

    delete context.data.code;
    delete context.data.addGiftCard;

    context.data.giftCardAdded = true;
    //@ts-ignore
    context.data.giftCardId = giftCard.data[0]._id;

    // //console.log(mailSent);
  } catch (error) {
    //console.log("Inside add gift card");
    //console.error(error);
  }
};
