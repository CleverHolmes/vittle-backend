import app from "../../../app";

export default async function (context: any) {
  //console.log(context.result);
  //console.log("Send email after first sign up");
  //console.log(context.params.user);

  if (
    context.result.secondary ||
    context.params.user === undefined ||
    context.result.hasOwnProperty("dontSendSetPasswordEmail")
  ) {
    return context;
  }

  //console.log("INSIDE Send email after first sign up");

  try {
    const activity = await context.app.service("activities").create({
      actionOn: context.result._id,
      actionBy: "Vittle",
      action: "send-set-password-email",
      data: {
        firstName: context.result.firstName,
        lastName: context.result.lastName,
        vittleLogoClick: 0,
        setPasswordButtonClick: 0,
        emailOpen: 0,
      },
    });

    const sendSetPasswordEmail = app
      .get("agenda")
      .schedule("in 2 minutes", "sendSetPasswordEmail", {
        activityId: activity._id,
        customerId: context.result._id,
      });

    //console.log(sendSetPasswordEmail);
  } catch (error) {
    //console.log(error);
  }

  return context;
}
