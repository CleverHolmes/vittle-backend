// Initializes the `mailer` service on path `/mailer`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
//@ts-ignore
import Mailer from "feathers-mailer";
//@ts-ignore
import smtpTransport from "nodemailer-smtp-transport";

import hooks from "./mailer.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    mailer: Mailer & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  // Initialize our service with any options it requires
  app.use(
    "/mailer",
    Mailer(
      smtpTransport({
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true, // 487 only
        requireTLS: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    )
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("mailer");

  service.hooks(hooks);
}
