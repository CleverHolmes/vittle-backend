// Initializes the `twilio` service on path `/twilio`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import twilio from "twilio";
import { Twilio } from "./twilio.class";
import hooks from "./twilio.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    twilio: Twilio & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get("paginate"),
  };

  const TwilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  // Initialize our service with any options it requires
  app.use("/twilio", new Twilio(options, app, TwilioClient));

  // Get our initialized service so that we can register hooks
  const service = app.service("twilio");

  service.hooks(hooks);
}
