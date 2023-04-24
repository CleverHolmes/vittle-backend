import app from "../app";
import welcomeTemplate from "../email-templates/welcome-to-vittle";
import { Application } from "@feathersjs/feathers";

export default (app: Application) => {
  app.get("agenda").define("pauseSubscriptionJob", async (job: any) => {
    //console.log("Going in pause subscription job");

    //@ts-ignore
    const { subscriptionId } = job.attrs.data;

    try {
      await app.service("subscriptions").patch(subscriptionId, {
        status: "paused",
      });

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in pause subscription job");
      //console.log("Error in try/catch");
      //console.log(error);
      job.fail(error.toString());
    }
  });
};
