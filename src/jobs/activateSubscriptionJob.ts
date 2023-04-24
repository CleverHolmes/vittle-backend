import app from "../app";
import welcomeTemplate from "../email-templates/welcome-to-vittle";
import { Application } from "@feathersjs/feathers";

export default (app: Application) => {
  app.get("agenda").define("activateSubscriptionJob", async (job: any) => {
    //console.log("Going in activate subscription job");

    //@ts-ignore
    const { subscriptionId } = job.attrs.data;

    try {
      await app.service("subscriptions").patch(subscriptionId, {
        status: "active",
      });

      // const activity = await app.service("activities").create({
      //   actionOn: context.params.user._id,
      //   actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      //   action: "activate-subscription",
      //   data: {
      //     firstName: context.params.user.firstName,
      //     lastName: context.params.user.lastName,
      //   },
      // });

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in activate subscription job");
      //console.log("Error in try/catch");
      //console.log(error);
      job.fail();
    }
  });
};
