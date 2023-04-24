import app from "../app";
import welcomeTemplate from "../email-templates/welcome-to-vittle";
import { Application } from "@feathersjs/feathers";

export default (app: Application) => {
  app.get("agenda").define("autoCaptureGroceryOrder", async (job: any) => {
    //@ts-ignore
    const { orderId, paymentIntentId } = job.attrs.data;

    const order = await app.service("orders").get(orderId);

    if (!order) {
      job.fail("autoCaptureGroceryOrder: Order not found");
    }

    try {
      const paymentIntent = await app
        .service("/stripe/payment-intent")
        .patch(paymentIntentId, {
          capture: true,
        });

      if (paymentIntent) {
        if (paymentIntent.status === "succeeded") {
          await app.service("orders").patch(order._id, {
            status: "processing",
            paymentStatus: "paid",
          });
        }
      }

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in autoCaptureGroceryOrder.ts");
      //console.log("Error in try/catch");
      //console.log(error);
      job.fail(error.toString());
    }
  });
};
