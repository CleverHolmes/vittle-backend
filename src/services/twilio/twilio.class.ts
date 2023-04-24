import {
  Id,
  NullableId,
  Paginated,
  Params,
  ServiceMethods,
} from "@feathersjs/feathers";
import { Application } from "../../declarations";

interface Data {
  to: String;
  message: String;
}

interface ServiceOptions {}

export class Twilio implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;
  twilioClient: any;

  constructor(
    options: ServiceOptions = {},
    app: Application,
    twilioClient: any
  ) {
    this.options = options;
    this.app = app;
    this.twilioClient = twilioClient;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: Id, params?: Params): Promise<Data> {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: Data, params?: Params): Promise<Data> {
    //console.log("In create");
    // console.log({
    //   to: data.to,
    //   from: process.env.TWILIO_FROM_PHONE,
    //   body: data.message,
    // });

    return this.twilioClient.messages.create({
      to: data.to,
      from: process.env.TWILIO_FROM_PHONE,
      body: data.message,
    });

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
