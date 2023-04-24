import moment from "moment";

export default async (context: any) => {
  //console.log("Going into before patch cancel order by customer");

  if (
    context.data.hasOwnProperty("cancelReason") &&
    context.data.hasOwnProperty("cancelNote") &&
    !context.data.hasOwnProperty("cancelledByCustomer")
  ) {
    context.data.cancelledByCustomer = true;
  }

  context.data.cancelledAt = moment().toISOString();

  return context;
};
