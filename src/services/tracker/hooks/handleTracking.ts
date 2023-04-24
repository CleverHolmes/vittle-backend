export default async function (context: any) {
  //console.log("Going in handleTracking");

  if (!context.id) {
    return context;
  }

  if (!context.params.query.track) {
    return context;
  }

  const trackType = context.params.query.track;
  let incrementObject;

  if (trackType === "emailOpen") {
    //console.log("Going in email open");
    incrementObject = {
      "data.emailOpen": 1,
    };
  }

  if (trackType === "vittleLogoClick") {
    //console.log("Going in vittleLogoClick");
    incrementObject = {
      "data.vittleLogoClick": 1,
    };
  }

  if (trackType === "setPasswordButtonClick") {
    //console.log("Going in setPasswordButtonClick");
    incrementObject = {
      "data.setPasswordButtonClick": 1,
    };
  }

  if (trackType === "verifyAccountButtonClick") {
    //console.log("Going in verifyAccountButtonClick");
    incrementObject = {
      "data.verifyAccountButtonClick": 1,
    };
  }

  const activity = await context.app.service("activities").patch(context.id, {
    $inc: incrementObject,
  });

  //console.log(activity);

  return context;
}
