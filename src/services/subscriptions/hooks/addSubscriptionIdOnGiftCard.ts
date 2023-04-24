import mongoose from "mongoose";
import app from "../../../app";

export default async (context: any) => {
  //console.log("in add sub id on gift card after patch");
  //console.log(context.data);

  if (
    !context.data.hasOwnProperty("giftCardAdded") ||
    !context.data.hasOwnProperty("giftCardId")
  ) {
    return context;
  }
  //console.log("in add sub id on gift card after patch2");
  try {
    const giftCard = await app
      .service("gift-cards")
      .patch(context.result.giftCardId, {
        subscriptionId: context.result._id,
        subscriptionIdObject: mongoose.Types.ObjectId(context.result._id),
      });
  } catch (error) {
    //console.log("in add sub id on gift card after patch");
    //console.error(error);
  }
};
