// orders-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose, Schema } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "orders";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      customer: { type: Object },
      giftCardRecipientInformation: { type: Object },
      giftCardCode: { type: Object },
      giftCardCodeObjectId: { type: Schema.ObjectId },
      giftCardCodeId: { type: Schema.ObjectId },
      giftCardAmount: { type: Number },
      customerId: { type: String },
      subscriptionId: { type: String },

      subscriptionObjectId: { type: Schema.ObjectId },
      customerObjectId: { type: Schema.ObjectId },

      subscription: { type: Schema.Types.ObjectId, ref: "subscriptions" },
      customerRef: { type: Schema.Types.ObjectId, ref: "users" },

      address: { type: Object },
      delivery: { type: Object },
      selectedWeek: { type: Number },
      selectedWeekStartDate: { type: String },
      firstDeliveryDate: { type: Date },

      total: { type: Number, required: true },
      lineItems: { type: Array, required: true },
      //overwritten every time array changes
      lineItemsByDay: { type: Object },
      type: { type: String, required: true },
      guest: { type: Boolean, default: true },

      status: { type: String, required: true },
      paymentStatus: { type: String, required: true },
      fulfillmentStatus: { type: String, required: true },
      fulfillmentStatusesByDay: { type: Array },
      fulfillmentStatuses: { type: Array },
      paymentIntentId: { type: String },
      chargeId: { type: String },
      paymentType: { type: String },

      cancelled: { type: Boolean, default: false },
      cancelledAt: { type: String },
      cancelledByCustomer: { type: Boolean },
      cancelReason: { type: String },
      cancelNote: { type: String },

      reportedAt: { type: String },
      reportedAProblem: { type: Boolean, default: false },
      reportAProblemMessage: { type: String },

      // autoRenew to be removed later as this doesn't serve it's purpose anymore
      autoRenew: { type: Boolean, default: false },
      selectedMealPlan: { type: Object },
      selectedMealPlanName: { type: String },

      autoRenewOrder: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
