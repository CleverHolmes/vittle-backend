import moment from "moment";

export default async (context: any) => {
  //console.log("Going into reprotAProblemBeforePatch");

  if (
    !context.data.hasOwnProperty("reportAProblemMessage") &&
    !context.data.hasOwnProperty("reportedAProblem")
  ) {
    return context;
  }

  try {
    const order = await context.app.service("orders").get(context.data.orderId);

    if (!order) {
      return context;
    }

    if (order.status === "accepted") {
    } else if (order.status === "cancelled") {
    } else if (order.status === "processing") {
      //send receipt
    } else if (order.status === "") {
    }
  } catch (error) {
    //console.error(error);
  }
};
