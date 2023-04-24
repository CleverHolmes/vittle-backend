export default async (context: any) => {
  if (!context.arguments[0].query) {
    return context;
  }

  //console.log(context.arguments[0].query);

  if (!context.arguments[0].query.hasOwnProperty("type")) {
    return context;
  }

  if (context.arguments[0].query.type !== "Meals") {
    return context;
  }

  if (!context.arguments[0].query.selectedWeek) {
    return context;
  }

  //console.log(context.arguments[0].query.selectedWeek);

  let meals = [];

  try {
    meals = await context.app.service("products").Model.aggregate([
      {
        $match: {
          type: "Meal",
          $or: [
            {
              "availability.startDate": {
                $gte: new Date("2015-02-01T00:00:00.000Z"),
              },
              "availability.endDate": {
                $lte: new Date(),
              },
            },
            {
              "availability.startDate": {
                $gte: new Date("2015-02-01T00:00:00.000Z"),
              },
              noEndDate: true,
            },
          ],
        },
      },
      {
        $group: {
          _id: { category: "$category", subCategory: "$subCategory" },
          items: { $push: "$$ROOT" },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          v: {
            $push: {
              subCategory: "$_id.subCategory",
              items: "$$ROOT",
            },
          },
        },
      },
      {
        $project: { _id: 0, k: "$_id", v: 1 },
      },
      {
        $replaceRoot: { newRoot: { $arrayToObject: [["$$ROOT"]] } },
      },
      {
        $group: { _id: "", data: { $mergeObjects: "$$ROOT" } },
      },
      {
        $replaceRoot: { newRoot: "$data" },
      },
    ]);
  } catch (error) {
    //console.log(error);
  }

  //console.log(meals);

  if (meals.length > 0) {
    context.result = meals;
  }

  return context;
};
