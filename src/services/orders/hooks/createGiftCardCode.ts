import mongoose from "mongoose";
import currency from "currency.js";
import * as nanoid from "nanoid";

export default async (context: any) => {
  const nanoIdCustomAlphabet = nanoid.customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",
    21
  );
  let giftCardCode = nanoIdCustomAlphabet(16); //=> "FJvnLMNGqRPmlJBOhmWmK"

  try {
    let giftCard: any = await context.app.service("gift-cards").create({
      code: giftCardCode,
      codeType: "digital",
      initialAmount: currency(context.data.total).value,
      balance: currency(context.data.total).value,
      usageHistory: [],
    });

    context.data.giftCardCode = giftCardCode;
    context.data.giftCardCodeId = giftCard._id;
    context.data.giftCardCodeObjectId = mongoose.Types.ObjectId(giftCard._id);
  } catch (error) {
    //console.log(error);
  }

  return context;
};
