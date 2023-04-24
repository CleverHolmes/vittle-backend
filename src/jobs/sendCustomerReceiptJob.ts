import app from "../app";
import welcomeTemplate from "../email-templates/welcome-to-vittle";
import { Application } from "@feathersjs/feathers";
import { sendCustomerReceipt } from "../services/orders/sendCustomerReceiptEmail";

export default (app: Application) => {
  app.get("agenda").define("sendCustomerReceiptJob", async (job: any) => {
    //console.log("Going in pause subscription job");

    //@ts-ignore
    const { order } = job.attrs.data;

    try {
      //@ts-ignore
      sendCustomerReceipt({ order: order }, app);

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in sendCustomerReceiptJob job");
      //console.log("Error in try/catch");
      //console.log(error);
      job.fail(error.toString());
    }
  });
};
