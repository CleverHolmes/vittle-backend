// Initializes the `mailchimp` service on path `/mailchimp`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Mailchimp } from "./mailchimp.class";
import hooks from "./mailchimp.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    mailchimp: Mailchimp & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  // @ts-ignore
  app.use("/mailchimp", new Mailchimp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("mailchimp");

  service.hooks(hooks);
}
