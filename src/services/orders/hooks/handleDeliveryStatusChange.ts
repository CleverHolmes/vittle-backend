import { database } from "agenda/dist/agenda/database";
import moment from "moment";
import mongoose from "mongoose";
import deliveryNotification from "../../../email-templates/order/delivery-notification";

export default async (context: any) => {
  if (!context.params.query) {
    return context;
  }

  if (!context.params.query.hasOwnProperty("deliveryStatusChange")) {
    return context;
  }

  //console.log("IN BEFORE HANDLE DELIVERY STATUS CHANGE");

  try {
    //console.log(context.params.query);
    //console.log("data is", context.data);

    const orderStatusUpdate: any = await context.app
      .service("orders")
      .patch(context.id, {
        $push: {
          fulfillmentStatuses: {
            type: context.data.type,
            orderItemsTotal: context.data.orderItemsTotal,
            dayIndex: context.data.dayIndex,
            updatedAt: moment().toISOString(),
          },
        },
        $set: {
          [`fulfillmentStatusesByDay.${context.data.dayIndex}`]:
            context.data.type,
        },
      });

    if (context.data.type == "ready-for-pickup") {
      //console.log("ready for pickup");
      const mailSent = await context.app.service("mailer").create({
        from: `Vittle <omar@vittle.ca>`,
        // to: user.emailAddress,
        to: [
          "jivanyesh@gmail.com",
          "jeremy.bellefeuille@gmail.com",
          "omar@vittle.ca",
        ],
        // cc: ["jivanyesh@gmail.com"],
        subject:
          +`${context.data.customer.firstName}, your order is ready for pickup}`,

        //@ts-ignore
        html: deliveryNotification({
          orderId: context.id,
          address: context.data.address,
          orderItemsTotal: context.data.orderItemsTotal,
          customer: context.data.customer,
          delivery: context.data.delivery,
          lineItems: context.data.lineItems,

          heading: `${context.data.customer.firstName}, your Vittle is on its way`,
          paragraph: `Your order is ready for pickup between`,
          message:
            context.data.message !== "" ? context.data.message : undefined,
        }),
      });
      //console.log(mailSent);
      //console.log("after mail sent");

      const asd = await context.app.service("twilio").create({
        to: ["+16132622506", "+16138832467", "+917666137467"],
        message:
          context.data.delivery.type === "pickup"
            ? `${context.data.customer.firstName}, your order is ready to be picked up at Vittle`
            : `${context.data.customer.firstName}, your order has left the kitchen`,
      });
    }

    if (context.data.type == "in-transit") {
      //console.log("in transit");
      const mailSent = await context.app.service("mailer").create({
        from: `Vittle <omar@vittle.ca>`,
        // to: user.emailAddress,
        to: [
          "jivanyesh@gmail.com",
          "jeremy.bellefeuille@gmail.com",
          "omar@vittle.ca",
        ],
        // cc: ["jivanyesh@gmail.com"],
        subject:
          context.data.customer.firstName +
          `${
            context.data.delivery.type === "pickup"
              ? ", your order is ready for pickup"
              : ", your Vittle is on its way"
          }`,

        //@ts-ignore
        html: deliveryNotification({
          orderId: context.id,
          address: context.data.address,
          orderItemsTotal: context.data.orderItemsTotal,
          customer: context.data.customer,
          delivery: context.data.delivery,
          lineItems: context.data.lineItems,

          heading: `${context.data.customer.firstName}, your Vittle is on its way`,
          paragraph: `    ${
            context.data.delivery.type === "pickup"
              ? `Your order is ready to be picked up.`
              : `Your order is ready and ${context.data.deliveryDriver} is on their way to deliver your Vittle between 2:30 p.m. and 6:30 p.m.`
          }`,
          message:
            context.data.message !== "" ? context.data.message : undefined,
        }),
      });
      //console.log(mailSent);
      //console.log("after mail sent");

      const asd = await context.app.service("twilio").create({
        to: ["+16132622506", "+16138832467", "+917666137467"],
        message:
          context.data.delivery.type === "pickup"
            ? `${context.data.customer.firstName}, your order is ready to be picked up at Vittle`
            : `${context.data.customer.firstName}, your order has left the kitchen`,
      });
    }

    if (context.data.type == "delivered") {
      //console.log("in transit");
      const mailSent = await context.app.service("mailer").create({
        from: `Vittle <omar@vittle.ca>`,
        // to: user.emailAddress,
        to: [
          "jivanyesh@gmail.com",
          "jeremy.bellefeuille@gmail.com",
          "omar@vittle.ca",
        ],
        // cc: ["jivanyesh@gmail.com"],
        subject: `${context.data.customer.firstName}, your Vittle has been delivered`,
        //@ts-ignore
        html: deliveryNotification({
          orderId: context.id,
          address: context.data.address,
          orderItemsTotal: context.data.orderItemsTotal,
          customer: context.data.customer,
          delivery: context.data.delivery,
          lineItems: context.data.lineItems,

          heading: `${context.data.customer.firstName}, your Vittle has been delivered`,
          paragraph: `Thanks for shopping local and bon appétit!`,
          message:
            context.data.message !== "" ? context.data.message : undefined,
        }),
      });
      //console.log(mailSent);
      //console.log("after mail sent");

      const asd = await context.app.service("twilio").create({
        to: ["+16132622506", "+16138832467", "+917666137467"],
        message: `${context.data.customer.firstName}, thanks shopping local. Bon appétit!`,
      });
    }

    if (context.data.type == "not-delivered") {
      //console.log("in transit");
      const mailSent = await context.app.service("mailer").create({
        from: `Vittle <omar@vittle.ca>`,
        // to: user.emailAddress,
        to: [
          "jivanyesh@gmail.com",
          "jeremy.bellefeuille@gmail.com",
          "omar@vittle.ca",
        ],
        // cc: ["jivanyesh@gmail.com"],
        subject: `${context.data.customer.firstName}, your Vittle was not delivered`,
        //@ts-ignore
        html: deliveryNotification({
          orderId: context.id,
          address: context.data.address,
          orderItemsTotal: context.data.orderItemsTotal,
          customer: context.data.customer,
          delivery: context.data.delivery,
          lineItems: context.data.lineItems,

          heading: `${context.data.customer.firstName}, your Vittle was not delivered`,
          paragraph:
            "We could not deliver your Vittle. Please contact support to reschedule your delivery.",
          message:
            context.data.message !== "" ? context.data.message : undefined,

          button: true,
          buttonText: "Contact support",
          buttonLink: "Contact support",
        }),
      });
      //console.log(mailSent);
      //console.log("after mail sent");

      const asd = await context.app.service("twilio").create({
        to: ["+16132622506", "+16138832467", "+917666137467"],
        message: `${context.data.customer.firstName}, your Vittle was not delivered. Please contact support to reschedule your delivery. Call: 613-701-6250`,
      });
    }

    if (context.data.type == "delayed") {
      //console.log("in transit");
      const mailSent = await context.app.service("mailer").create({
        from: `Vittle <omar@vittle.ca>`,
        // to: user.emailAddress,
        to: [
          "jivanyesh@gmail.com",
          "jeremy.bellefeuille@gmail.com",
          "omar@vittle.ca",
        ],
        // cc: ["jivanyesh@gmail.com"],
        subject: context.data.customer.firstName + ", your Vittle is delayed",
        //@ts-ignore
        html: deliveryNotification({
          orderId: context.id,
          address: context.data.address,
          orderItemsTotal: context.data.orderItemsTotal,
          customer: context.data.customer,
          delivery: context.data.delivery,
          lineItems: context.data.lineItems,

          heading: `${context.data.customer.firstName}, your Vittle is delayed`,
          paragraph:
            "Unfortunately, your Vittle is delayed and will not be ready at the expected time. Please contact support if this may cause issues for you.",
          message:
            context.data.message !== "" ? context.data.message : undefined,
          button: true,
          buttonText: "Contact support",
          buttonLink: "Contact support",
        }),
      });

      //console.log(mailSent);
      //console.log("after mail sent");

      const asd = await context.app.service("twilio").create({
        to: ["+16132622506", "+16138832467", "+917666137467"],
        message: `${context.data.customer.firstName}, your Vittle is delayed. Please contact support if this may cause issues for you. Call: 613-701-6250`,
      });
    }

    context.result = true;

    return context;
  } catch (error) {
    //console.log(error);
  }

  return context;
};
