import moment from "moment";
import getProductPlatingDate from "../../../modules/getProductPlatingDate";
import groupLineItemsByDay from "../../../modules/groupLineItemsByDay";

export default async (context: any) => {
  //console.log("Inside group line items by day");

  if (context.data.type === "giftCard") {
    return context;
  }

  try {
    context.data.lineItemsByDay = groupLineItemsByDay(
      context.data.lineItems,
      context.data.selectedWeek
    );
  } catch (error) {
    //console.log("error in line items by day");
    //console.log(error);
  }

  return context;
};
