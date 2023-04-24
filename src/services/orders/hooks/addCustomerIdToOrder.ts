import mongoose from "mongoose";

export default async (context: any) => {
  try {
    if (context.params.user == null) {
      return context;
    }

    // Todo: changes to the user ID when admin is placing an order

    context.data.customerId = context.params.user._id;
    context.data.subscriptionId = context.params.user._id;

    context.data.customerObjectId = mongoose.Types.ObjectId(
      context.params.user._id
    );
    context.data.subscriptionObjectId = mongoose.Types.ObjectId(
      context.params.user._id
    );
  } catch (error) {
    //console.log(error);
  }

  return context;
};
