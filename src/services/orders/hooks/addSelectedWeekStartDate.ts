import moment from "moment";

export default async (context: any) => {
  if (context.data.hasOwnProperty("autoRenewOrder")) {
    if (context.data.autoRenewOrder) {
      return context;
    }
  }

  if (context.data.type === "giftCard") {
    return context;
  }

  context.data.selectedWeekStartDate = moment()
    .add(context.data.selectedWeek, "w")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");

  return context;
};
