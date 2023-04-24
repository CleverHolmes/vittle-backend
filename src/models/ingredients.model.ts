// ingredients-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "ingredients";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      oldId: { type: String },
      SKU: {type: String },
      custom: { type: Boolean },
      title: { type: String },
      titleFR: { type: String },
      FoodID: { type: Number },
      FoodCode: { type: Number },
      FoodGroupID: { type: Number },
      FoodDescription: { type: String, index: "text" },
      FoodDescriptionFR: { type: String },
      category: { type: String, },
      categoryFR: { type: String },
      servingSizes: { type: Array },
      units: { type: Array },
      nutrientInfo: { type: Object },
      refuseAmounts: { type: Object },
      subingredients: { type: Array },
      type: {type: String},
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
