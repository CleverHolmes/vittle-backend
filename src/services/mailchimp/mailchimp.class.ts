import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods
} from "@feathersjs/feathers";
import { Application } from "../../declarations";

let MailchimpApi = require("mailchimp-api-v3");

interface Data {}

interface ServiceOptions {}

interface MailChimpAPI {
  get: Function;
  post: Function;
  put: Function;
  patch: Function;
  delete: Function;
}

// audience/list id:9d44aa4d1c

// api key:86fff515dd34aa056649a8c9132bbd3d-us19

export class Mailchimp implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;
  API: MailChimpAPI;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
    this.API = new MailchimpApi(app.get("mailchimpApiKey"));
  }

  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }

  async get(data: any, params?: Params): Promise<Data> {
    return this.API.get(data);
  }

  async create(data: any, params?: Params): Promise<Data> {
    const path = data.path;

    delete data.path;

    return this.API.post(path, {
      ...data.body
    });
  }

  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
