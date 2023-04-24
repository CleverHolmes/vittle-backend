// Initializes the `tracker` service on path `/tracker`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Tracker } from "./tracker.class";
import hooks from "./tracker.hooks";
import redirectAfterTrack from "./hooks/redirectAfterTrack";
import serveImageEmailOpenTrack from "./hooks/serveImageEmailOpenTrack";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    tracker: Tracker & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const options = {
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use(
    "/tracker",
    //@ts-ignore
    new Tracker(options, app),
    redirectAfterTrack,
    serveImageEmailOpenTrack
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("tracker");

  service.hooks(hooks);
}
