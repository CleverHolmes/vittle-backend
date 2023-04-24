import { Id, Params } from "@feathersjs/feathers";
import { Application } from "../../declarations";

interface Data {}

interface ServiceOptions {}

export class Tracker {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async get(id: Id, params?: Params): Promise<Data> {
    return {};
  }
}
