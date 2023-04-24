// Initializes the `authmanagement` service on path `/authmanagement`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import authManagement from "feathers-authentication-management";

import hooks from "./authmanagement.hooks";
import notifier from "./notifier";

// Add this service to the service type index
// declare module "../../declarations" {}

export default function (app: Application): void {
  const options = {
    paginate: app.get("paginate"),
  };
  // Initialize our service with any options it requires
  // app.use("/authmanagement", ewauthManagement(notifier(app)));
  app.configure(authManagement(notifier(app)));

  // Get our initialized service so that we can register hooks
  const service = app.service("authManagement");

  service.hooks(hooks);
}
