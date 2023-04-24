require("dotenv").config();
import path from "path";
import favicon from "serve-favicon";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";

import feathers from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import express from "@feathersjs/express";
import socketio from "@feathersjs/socketio";
// import authManagement from "feathers-authentication-management";
import currency from "currency.js";
import moment from "moment";
//@ts-ignore
import Agenda from "agenda";
import defineJobs from "./jobs";

import calculateOrderLinteItems from "./modules/calculateOrderLineItems";
// import orderReceiptTemplate from "./email-templates/order/order";
import newOrderTemplate from "./email-templates/order/owner";

const {
  Charge,
  SetupIntent,
  Customer,
  PaymentMethod,
  PaymentIntent,
  Refund,
} = require("feathers-stripe");
// //console.log(charge);

import { Application } from "./declarations";
import logger from "./logger";
import middleware from "./middleware";
import services from "./services";
import appHooks from "./app.hooks";
import channels from "./channels";
import authentication from "./authentication";
import mongoose from "./mongoose";
import sendOrderRefundedEmail from "./services/orders/sendOrderRefundedEmail";
import sendOrderCancelledEmail from "./services/orders/sendOrderCancelledEmail";
import sendOrderAcceptedEmail from "./services/orders/sendOrderAcceptedEmail";

// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));

// Host the public folder
app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// app.configure(authManagement);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

app.use(
  "/stripe/charges",
  new Charge({ secretKey: process.env.STRIPE_SECRET_TEST })
);

app.use(
  "/stripe/refund",
  new Refund({ secretKey: process.env.STRIPE_SECRET_TEST })
);

app.use(
  "/stripe/setup-intent",
  new SetupIntent({ secretKey: process.env.STRIPE_SECRET_TEST })
);

app.use(
  "/stripe/payment-intent",
  new PaymentIntent({ secretKey: process.env.STRIPE_SECRET_TEST })
);

app.use(
  "/stripe/customer",
  new Customer({ secretKey: process.env.STRIPE_SECRET_TEST })
);

app.use(
  "/stripe/payment-method",
  new PaymentMethod({ secretKey: process.env.STRIPE_SECRET_TEST })
);

const customerService: any = app.service("/stripe/customer");
const paymentMethodService: any = app.service("/stripe/payment-method");
const refundService: any = app.service("/stripe/refund");
const paymentIntentService: any = app.service("/stripe/payment-intent");
const setupIntentService: any = app.service("/stripe/setup-intent");

const agenda = new Agenda({ db: { address: app.get("mongodb") } });
app.set("agenda", agenda);
defineJobs(app);

(async () => {
  await agenda.start();

  try {
    // agenda.every("30 00 * * 4", "mainBillingJob");
    // agenda.every("10 seconds", "cutoffReminderJob");
  } catch (error) {
    //console.log("IN here");
    //console.log(error);
  }
})();

setupIntentService.hooks({
  before: {},
  after: {
    create: [
      async (context: any) => {
        // try {
        //   //console.log("Going in after create setup intent");
        //   //console.log(context.result);
        //   if (context.data.customer) {
        //     //console.log("Going in after create setup has customer data");
        //     const sub: any = await app.service("subscriptions").find({
        //       query: {
        //         stripe_customer_id: context.data.customer,
        //       },
        //     });
        //     if (sub.total > 0) {
        //       //console.log("Sub found setup intent");
        //       await app.service("subscriptions").patch(sub.data[0]._id, {
        //         stripePaymentMethodDefault: context.result.payment_method,
        //         $push: {
        //           stripePaymentMethods: context.result.payment_method,
        //         },
        //       });
        //     }
        //   }
        // } catch (error) {
        //   //console.log(error);
        //   //console.log("Error in setup intent after create");
        // }
      },
    ],
  },
});

paymentMethodService.hooks({
  before: {},
  after: {
    create: [
      async (context: any) => {
        //console.log("After card add");
        //console.log(context.result);
        //console.log(context.data);
        const activity = await app.service("activities").create({
          actionOn: context.params.user._id,
          actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
          action: "add-card",
          data: {
            firstName: context.params.user.firstName,
            lastName: context.params.user.lastName,
          },
        });
      },
    ],

    remove: [
      async (context: any) => {
        //console.log("After card remove");
        //console.log(context.result);
        //console.log(context.data);
        const activity = await app.service("activities").create({
          actionOn: context.params.user._id,
          actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
          action: "remove-card",
          data: {
            cardLast4: context.result.card.last4,
            cardBrand: context.result.card.brand,
            firstName: context.params.user.firstName,
            lastName: context.params.user.lastName,
          },
        });
      },
    ],

    patch: [
      async (context: any) => {
        //console.log("After payment method patch");

        //console.log(context.result);
        //console.log(context.data);

        if (
          context.data.hasOwnProperty("attach") &&
          context.data.hasOwnProperty("customer")
        ) {
          //console.log("GETTING");

          const activity = await app.service("activities").create({
            actionOn: context.params.user._id,
            actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
            action: "add-card",
            data: {
              cardLast4: context.result.card.last4,
              cardBrand: context.result.card.brand,
              firstName: context.params.user.firstName,
              lastName: context.params.user.lastName,
            },
          });
        }
      },
    ],
  },
});

customerService.hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context: any) => {
        //console.log(context.result);

        const updatedSub = await app
          .service("subscriptions")
          .patch(context.result.metadata.subscriptionId, {
            paymentMethod: "card",
            stripe_customer_id: context.result.id,
          });

        //console.log("Create stripe customer with card");

        const activity1 = await app.service("activities").create({
          actionOn: context.params.user._id,
          actionBy: "Vittle",
          action: "create-stripe-customer",
          data: {
            firstName: context.params.user.firstName,
            lastName: context.params.user.lastName,
            stripeCustomerId: context.result.id,
          },
        });

        const activity = await app.service("activities").create({
          actionOn: context.params.user._id,
          actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
          action: "add-card",
          data: {
            firstName: context.params.user.firstName,
            lastName: context.params.user.lastName,
          },
        });

        //console.log(activity1);
        //console.log("add-card");
        //console.log(activity);

        // //console.log(updatedSub);

        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

refundService.hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [sendOrderRefundedEmail],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

paymentIntentService.hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [sendOrderCancelledEmail],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [sendOrderAcceptedEmail],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

// Configure a middleware for 404s and the error handler
//@ts-ignore
app.use(express.notFound());
//@ts-ignore
app.use(express.errorHandler({ logger } as any));

app.hooks(appHooks);

(async () => {
  // const msg = `We cancelled your order, Jeremy.\n\nYou will not be charged for any portion of your order if a temporary hold was placed on your payment method. This is not a charge and should disappear from your bank statement shortly.\n\nView receipt: https://beta.vittle.ca?order=5asd64inc649nd237Ashd`;
  // try {
  //   const asd = await app.service("twilio").create({
  //     to: "+917666137467",
  //     // to: "+16132622506",
  //     message: msg,
  //   });
  //   //console.log(asd.sid);
  // } catch (error) {
  //   //console.log(error);
  // }
  //   const order = await app.service("orders").get("5ff636a9f4a9ad4d8c73ed27");
  //   //console.log(order);
  //   //console.log(
  //     calculateOrderLinteItems({
  //       lineItems: order.lineItems,
  //       deliveryType: order?.delivery?.type,
  //     })
  //   );
  //   // return;
  //   if (order.paymentType === "card") {
  //     if (order.paymentIntentId) {
  //       let cardLast4 = "";
  //       let cardBrand = "";
  //       const paymentIntent = await app
  //         .service("/stripe/payment-intent")
  //         .get(order.paymentIntentId);
  //       //console.log(paymentIntent);
  //       cardLast4 =
  //         paymentIntent.charges.data[0].payment_method_details.card.last4;
  //       cardBrand =
  //         paymentIntent.charges.data[0].payment_method_details.card.brand;
  //       try {
  //         const mailSent = await app.service("mailer").create({
  //           from: `Vittle <omar@vittle.ca>`,
  //           // to: "jeremy.bellefeuille@gmail.com",
  //           to: "omar@vittle.ca",
  //           cc: ["jivanyesh@gmail.com", "jeremy.bellefeuille@gmail.com"],
  //           subject: `${
  //             order.customer.firstName
  //           } placed a grocery order for ${currency(order.total).format()}`,
  //           // subject: `Merci d'avoir commandé, Jeremy`,
  //           html: newOrderTemplate({
  //             firstName: order.customer.firstName,
  //             language: order.customer.language,
  //             orderId: order._id,
  //             orderDate: moment(order.createdAt).format(
  //               `MMMM D[,] YYYY [at] HH:mm a`
  //             ),
  //             customerLanguage: order.customer.language,
  //             deliveryDate: order.delivery.date,
  //             deliveryType: order.delivery.type,
  //             address: order.address,
  //             lineItems: order.lineItems,
  //             total: order.total,
  //             orderLineItems: calculateOrderLinteItems({
  //               lineItems: order.lineItems,
  //               deliveryType: order?.delivery?.type,
  //             }),
  //             cardBrand,
  //             cardLast4,
  //             paymentIntentId: order.paymentIntentId,
  //           }),
  //         });
  //         //console.log(mailSent);
  //       } catch (error) {
  //         //console.error(error);
  //       }
  //     }
  //   }
})();

process.on("SIGTERM", async () => {
  await agenda.stop();
});

process.on("SIGINT", () => {
  process.exit(0);
});

export default app;
