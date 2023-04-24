import moment from "moment";

export default async (context: any) => {
  //console.log("Going orders get plating datadata");

  if (!context.params.query.hasOwnProperty("plating")) {
    return context;
  }

  if (!context.params.query.hasOwnProperty("selectedDate")) {
    return context;
  }

  const selectedDate = context.params.query.selectedDate;

  //console.log(selectedDate);

  let orderItems = [];

  let weekStartDate = moment(selectedDate)
    .add(1, "d")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");

  //console.log(weekStartDate);

  // if sunday
  let isoWeekDayNumber =
    moment(selectedDate).isoWeekday() === 7
      ? 0
      : moment(selectedDate).isoWeekday();

  //console.log(isoWeekDayNumber);

  let matchObj: any = {
    selectedWeekStartDate: weekStartDate,
  };

  matchObj[`lineItemsByDay.${isoWeekDayNumber}`] = { $gte: { $size: 1 } };

  //console.log(matchObj);

  try {
    orderItems = await context.app.service("orders").Model.aggregate([
      {
        $match: matchObj,
      },
      {
        $lookup: {
          from: "users",
          localField: "customerObjectId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$lineItemsByDay",
      },
      {
        $group: {
          _id: "$_id",
          lineItemsByDayAll: { $push: `$lineItemsByDay.${isoWeekDayNumber}` },
          firstName: { $push: "$user.firstName" },
          lastName: { $push: "$user.lastName" },
        },
      },
      {
        $unwind: "$lineItemsByDayAll",
      },
      {
        $unwind: "$firstName",
      },
      {
        $unwind: "$lastName",
      },
      {
        $unwind: "$firstName",
      },
      {
        $unwind: "$lastName",
      },
      {
        $project: {
          _id: "$lineItemsByDayAll.id",
          title: "$lineItemsByDayAll.title",
          variant: "$lineItemsByDayAll.selectedVariant.name",
          quantity: { $sum: "$lineItemsByDayAll.quantity" },
          name: { $concat: ["$firstName", " ", "$lastName"] },
        },
      },
      {
        $group: {
          _id: {
            id: "$_id",
            title: "$title",
            variant: "$variant",
            name: "$name",
          },
          quantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id.id",
          title: "$_id.title",
          variant: "$_id.variant",
          quantity: "$quantity",
          name: "$_id.name",
        },
      },
    ]);

    //console.log("Plating items results");
    //console.log(orderItems);
  } catch (error) {
    //console.log(error);
  }

  //console.log("Reaching");

  context.result = orderItems;

  return context;
};
