// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";

export default function (app: Application) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const schema = new mongooseClient.Schema(
    {
      subscriptionId: { type: String },
      email: { type: String, unique: true },
      password: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      acceptsMarketing: { type: Boolean },
      phone: { type: String },
      address: { type: Array },
      activity: { type: Array },
      picture: { type: Object },
      status: { type: String },

      //stripe ids
      stripe_customer_id: { type: String },
      stripe_payment_method_id: { type: String },

      facebookId: { type: String },
      passwordSet: { type: Boolean },
      notes: String,
      secondary: Boolean,
      primaryAccountId: String,
      secondaryAccounts: [String],
      hasSecondaries: Boolean,
      settings: Object,

      birthdayMonth: { type: Number },
      birthdayDay: { type: Number },

      dontSendSetPasswordEmail: { type: Boolean, default: false },
      dontSendVerifyEmail: { type: Boolean, default: false },

      //auth management fields
      isVerified: { type: Boolean },
      verifyToken: { type: String },
      verifyExpires: { type: Date },
      verifyChanges: { type: Object },
      resetToken: { type: String },
      resetShortToken: { type: String },
      resetExpires: { type: Date },

      //role
      role: { type: String },
      roles: { type: Array },

      // meal plan details
      mealPlan: { type: Object },
      mealPlanName: { type: String },

      //order
      firstEverOrderWeekDate: { type: Date },
      firstEverOrderWeek: { type: String },
      hasSubscribedToMealPlanAtleastOnce: { type: Boolean },

      //delivery personnel color code for marker and other elements
      colorCode: { type: String },
      postalCodes: { type: Array },
      finalDestination: { type: Object },
      finalDestinationLatLng: { type: Object },

      deleted: { type: Boolean, default: false },
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
