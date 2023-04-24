import app from "../../../app";

export default async function (context: any) {
  // //console.log(context.data);
  // //console.log(context.result);
  // //console.log(context.params.user);

  if (context.data.password) {
    try {
      await context.app.service("activities").create({
        actionOn: context.params.user._id,
        actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
        action: "change-password",
      });
    } catch (error) {
      //console.log(error);
    }
  }
  return context;
}
