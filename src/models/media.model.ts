// media-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "media";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      path: { type: String },
      name: { type: String },
      type: { type: String, required: true, default: "product" },
      // typeOf: { type: String, required: true },
      transforms: {
        type: Array,
      },
      for: {
        type: String,
      },
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
