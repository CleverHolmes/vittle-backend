// activities-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";

export default function (app: Application) {
  const modelName = "activities";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      actionOn: { type: String, required: true },
      actionBy: { type: String, required: true },
      action: { type: String, required: true },
      //ADD Twinstar 2023/4/27 for admin dashboard notification
      type: { type: String },
      checked: { type: Boolean },
      jobId: { type: String },
      data: { type: Object }
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
