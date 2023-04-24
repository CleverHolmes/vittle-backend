import { HookContext } from "@feathersjs/feathers";
import isAdmin from "../../../modules/isAdmin";

export default async (context: any) => {
  // //console.log("INSIDE ADDRESS ACTIVITY");
  // //console.log(context.data);

  if (!context.data.hasOwnProperty("address")) {
    return context;
  }

  if (
    !context.params.query.hasOwnProperty("type") &&
    !context.params.query.hasOwnProperty("currentAddress")
  ) { 
    return context;
  }

  //console.log("ADDRESS ACTIVITY GOING");
  //console.log(context.params.query.type);

  //console.log(context.id);

  let actionTakenBy = context.params.user;
  let actionTakenOn = context.params.user;

  if (isAdmin(context.params.user.roles)) {
    actionTakenOn = await context.app.service("users").get(context.id);
  }

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

  if (context.params.query.type === "add") {
    const activity = await context.app.service("activities").create({
      actionOn: context.id,
      actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      action: "add-address",
      data: {
        firstName: context.params.user.firstName,
        lastName: context.params.user.lastName,
        actionByAdmin: isAdmin(context.params.user.roles),
        address: deliveryAddress,
      },
    });
  }

  if (context.params.query.type === "addPrimary") {
    const activity = await context.app.service("activities").create({
      actionOn: context.id,
      actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      action: "add-address-primary",
      data: {
        firstName: context.params.user.firstName,
        lastName: context.params.user.lastName,
        actionByAdmin: isAdmin(context.params.user.roles),
        address: deliveryAddress,
      },
    });
  }

  if (context.params.query.type === "update") {
    // heading = `${actionTakenBy} updated an address`;
    // paragraph = `Updated the address to ${deliveryAddress}.`;

    const activity = await context.app.service("activities").create({
      actionOn: context.id,
      actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      action: "update-address",
      data: {
        firstName: context.params.user.firstName,
        lastName: context.params.user.lastName,
        actionByAdmin: isAdmin(context.params.user.roles),
        address: deliveryAddress,
      },
    });
  }

  if (context.params.query.type === "editPrimary") {
    // heading = `${actionTakenBy} changed their primary delivery address`;
    // paragraph = `Delivery address changed to ${deliveryAddress}.`;

    const activity = await context.app.service("activities").create({
      actionOn: context.id,
      actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      action: "edit-address",
      data: {
        firstName: context.params.user.firstName,
        lastName: context.params.user.lastName,
        actionByAdmin: isAdmin(context.params.user.roles),
        address: deliveryAddress,
      },
    });
  }

  if (context.params.query.type === "remove") {
    // heading = `${actionTakenBy} removed an address`;
    // paragraph = `Delivery address ${deliveryAddress} was removed.`;

    const activity = await context.app.service("activities").create({
      actionOn: context.id,
      actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      action: "delete-address",
      data: {
        firstName: context.params.user.firstName,
        lastName: context.params.user.lastName,
        actionByAdmin: isAdmin(context.params.user.roles),
        address: deliveryAddress,
      },
    });
  }
};
