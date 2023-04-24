// gift-cards-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "giftCards";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      code: { type: String, required: true },
      codeType: { type: String, required: true },
      customerId: { type: String },
      customerIdObject: { type: Schema.ObjectId },
      subscriptionId: { type: String },
      subscriptionIdObject: { type: Schema.ObjectId },
      initialAmount: { type: Number, required: true },
      balance: { type: Number, required: true },
      usageHistory: { type: Array },
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
