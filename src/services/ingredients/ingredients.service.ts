// Initializes the `ingredients` service on path `/ingredients`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Ingredients } from "./ingredients.class";
import createModel from "../../models/ingredients.model";
import hooks from "./ingredients.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    ingredients: Ingredients & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    whitelist: ["$regex", "$or"],
  };

  // Initialize our service with any options it requires
  app.use("/ingredients", new Ingredients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("ingredients");

  service.hooks(hooks);
}
