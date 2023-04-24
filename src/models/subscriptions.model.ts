// subscriptions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";

export default function (app: Application) {
  const modelName = "subscriptions";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      customerId: { type: String, required: true, index: true },
      amount: { type: Number },
      status: { type: String },
      paymentMethod: { type: String },
      stripe_customer_id: { type: String },
      stripePaymentMethodDefault: { type: String },
      stripePaymentMethods: { type: Array },
      // schedule: { type: Array },
      autoRenew: { type: Boolean },
      mealPlan: { type: Object },
      mealPlanName: { type: String },
      allCustomers: { type: Array, index: true },
      

      giftCardAdded: { type: Boolean, default: true},
      giftCardId: { type: String },

      deliveryType: { type: String },
      deliveryTime: { type: String },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }

  return mongooseClient.model(modelName, schema);
}
