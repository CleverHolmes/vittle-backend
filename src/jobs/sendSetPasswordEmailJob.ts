import app from "../app";
import welcomeTemplate from "../email-templates/welcome-to-vittle";
import { Application } from "@feathersjs/feathers";

export default (app: Application) => {
  app.get("agenda").define("sendSetPasswordEmail", async (job: any) => {
    //@ts-ignore
    const { activityId, customerId } = job.attrs.data;

    const user = await app.service("users").get(customerId);

    if (!user) {
      job.fail("sendWelcomeEmailJob: User not found");
    }

    try {
      app.service("mailer").create({
        from: `Vittle <omar@vittle.ca>`,
        to: user.email,
        subject: `${
          // user.settings.language === "EN" ?
          "Welcome to Vittle,"
          // : "Bienvenue à Vittle"
        } ${user.firstName}`,
        html: welcomeTemplate({
          firstName: user.firstName,
          activityId: activityId,
          language: user.settings.language,
        }),
      });

      app.service("activities").patch({
        jobId: job.attrs._id,
      });
    } catch (error) {
      //console.log("Error in sendWelcomeEmailJob.ts");
      //console.log("Error in try/catch");
      //console.log(error);
      job.fail(error.toString());
    }
  });
};
