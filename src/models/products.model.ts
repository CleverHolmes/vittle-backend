// products-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "products";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      slug: { type: String },
      status: { type: Boolean },
      title: { type: String, required: true },
      titleFR: { type: String },
      description: { type: String },
      descriptionFR: { type: String },
      variants: { type: Array, required: true },
      extraIds: { type: Array, default: [] },
      extras: { type: Array, default: [] },
      trackQuantity: { type: Boolean, required: true },
      continueSellingWhenOutOfStock: { type: Boolean, required: true },
      taxExempt: { type: Boolean, required: true },
      countryOfOrigin: { type: String },
      ingredientIds: { type: Array },
      ingredients: { type: Array },
      type: { type: String, required: true }, // Meals, Groceries, Ingredients, Extras
      category: { type: String }, // Dairy
      subCategory: { type: String }, // Eggs
      brand: { type: String },
      tags: { type: Array, required: true },
      salesChannels: { type: Array, required: true },
      maxQuantityInCart: { type: Number },
      availability: { type: Array },
      substitutions: { type: Array },
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
