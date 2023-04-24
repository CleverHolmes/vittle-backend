import { HookContext } from "@feathersjs/feathers";
import moment from "moment";
import primaryAddressChangedTemplate from "../../../email-templates/user/address-changed";
import isAdmin from "../../../modules/isAdmin";

export async function sendAddressUpdateEmail(data: any, context: any) {
  //console.log("going in sendAddressUpdateEmail");

  try {
    await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: [
        "jeremy.bellefeuille@gmail.com",
        "omar@vittle.ca",
        "jivanyesh@gmail.com",
      ],
      // to: data.emailAddress,
      subject: data.heading,
      //@ts-ignore
      html: primaryAddressChangedTemplate({
        //@ts-ignore
        customerName: data.customerName,
        customerId: data.customerId,
        heading: data.heading,
        paragraph: data.paragraph,
        subParagraph: data.subParagraph,
      }),
    });
  } catch (error) {
    //console.log(error);
  }
}

export async function sendAddressUpdateCustomerEmail(data: any, context: any) {
  //console.log("going in sendAddressUpdateCustomerEmail");

  try {
    await context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: data.customerId,
      subject: data.heading,
      //@ts-ignore
      html: primaryAddressChangedTemplate({
        //@ts-ignore
        customerName: data.customerName,
        customerId: data.customerId,
        heading: data.heading,
        paragraph: data.paragraph,
        subParagraph: data.subParagraph,
      }),
    });
  } catch (error) {
    //console.log(error);
  }
}

export default async (context: any) => {
  //console.log(context.data);

  if (!context.data.hasOwnProperty("address")) {
    return context;
  }

  if (
    !context.params.query.hasOwnProperty("type") &&
    !context.params.query.hasOwnProperty("currentAddress")
  ) {
    return context;
  }

  // check if admin and use users subscription id on which this operation is being run on
  let subscriptionId = "";
  let sub = null;

  //console.log('isAdmin')
  //console.log(context.params.user.roles);
  //console.log(isAdmin(context.params.user.roles));

  if (isAdmin(context.params.user.roles)) {
    sub = await context.app
      .service("subscriptions")
      .find({ query: { customerId: context.id } });
      subscriptionId = sub.data[0]._id;

  } else {
    subscriptionId = context.params.user.subscriptionId;
    sub = await context.app.service("subscriptions").get(subscriptionId);
  }

  let mealPlanActive = false;
  let weekToFind = moment().isoWeekday() > 3 ? 1 : 2;

  const orders = await context.app.service("orders").find({
    query: {
      subscriptionId: subscriptionId,
      selectedWeekStartDate: moment().startOf("isoWeek").format("YYYY-MM-DD"),
    },
  });

  if (orders.data.length > 0) {
    mealPlanActive = true;
  }

  let heading = "";
  let paragraph = "";
  let subParagraph = "";
  let customerName =
    context.params.user.firstName + " " + context.params.user.lastName;

  const deliveryAddress = `${
    context.params.query.currentAddress.hasOwnProperty("organization")
      ? context.params.query.currentAddress.organization
      : ""
  }
          ${context.params.query.currentAddress.Line1}, ${
    context.params.query.currentAddress.Line2
  }
          ${context.params.query.currentAddress.City}, ${
    context.params.query.currentAddress.Province
  } 
          ${context.params.query.currentAddress.PostalCode}
          ${
            context.params.query.currentAddress.buzzer !== ""
              ? `Buzzer: ${context.params.query.currentAddress.buzzer}`
              : ""
          }`;

  //console.log("ACTION ON ADDRESS:", deliveryAddress);
  //console.log(context.params.query);


  return context;

  const deliveryTimes = `${
    sub.deliveryType === "delivery" ? "delivered" : "picked up"
  } the ${sub.deliveryTime === "nightBefore" ? "night before" : "day of"}`;

  let deliveryTimeRange = "";

  if (sub.deliveryType === "delivery") {
    if (sub.deliveryTime === "nightBefore") {
      deliveryTimeRange = "2:30-6:30 p.m.";
    } else {
      deliveryTimeRange = "7:00-11:00 a.m.";
    }
  }

  if (sub.deliveryType !== "delivery") {
    if (sub.deliveryTime === "nightBefore") {
      deliveryTimeRange = "2:30-4:00 p.m.";
    } else {
      deliveryTimeRange = "7:00-11:00 a.m.";
    }
  }

  if (context.params.query.type === "add") {
    heading = `${customerName} added a new delivery address`;
    paragraph = `New delivery address ${deliveryAddress} was added .`;
  }

  if (context.params.query.type === "addPrimary") {
    heading = `${customerName} changed their primary delivery address`;
    paragraph = `Delivery address changed to ${deliveryAddress}.`;
  }

  if (context.params.query.type === "update") {
    heading = `${customerName} updated an address`;
    paragraph = `Updated the address to ${deliveryAddress}.`;
  }

  if (context.params.query.type === "editPrimary") {
    heading = `${customerName} changed their primary delivery address`;
    paragraph = `Delivery address changed to ${deliveryAddress}.`;
  }

  if (context.params.query.type === "remove") {
    heading = `${customerName} removed an address`;
    paragraph = `Delivery address ${deliveryAddress} was removed.`;

    const activity = await context.app.service("activities").create({
      actionOn: context.params.user._id,
      actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      action: "address-removed",
      data: {
        firstName: context.params.user.firstName,
        lastName: context.params.user.lastName,
      },
    });
  }

  if (
    (context.params.query.type === "addPrimary" ||
      context.params.query.type === "editPrimary") &&
    mealPlanActive &&
    sub.deliveryType !== "pickup"
  ) {
    subParagraph = `They will continue to receive meals at their current address until the end of the week. 
      As of next week, their meals will be sent to their new primary address.`;
  }

  try {
    sendAddressUpdateEmail(
      {
        customerId: context.params.user._id,
        customerName,
        heading,
        paragraph,
        subParagraph,
      },
      context
    );

    // //console.log(mailSent);
  } catch (error) {
    //console.log("Inside sendPausedEmail");
    //console.error(error);
  }
};
