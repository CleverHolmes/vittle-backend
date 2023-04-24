import moment from "moment";

export default async (context: any) => {
  //console.log("In products");
  //console.log("Going here");
  //console.log(context.arguments[0].query);

  if (!context.arguments[0].query) {
    return context;
  }

  if (!context.arguments[0].query.hasOwnProperty("selectedWeek")) {
    return context;
  }

  const selectedWeek = context.arguments[0].query.selectedWeek;

  let products = [];

  let weekStartDate = moment()
    .add(selectedWeek, "weeks")
    .startOf("isoWeek")
    .isoWeekday(1)
    .subtract(1, "d")
    // .set("hours", 0)
    // .set("minutes", 0)
    .toISOString();

  let weekEndDate = moment()
    .add(selectedWeek, "weeks")
    .startOf("isoWeek")
    .add(5, "d")
    // .set("hours", 0)
    // .set("minutes", 0)
    .toISOString();

  try {
    products = await context.app.service("products").Model.aggregate([
      {
        $facet: {
          meals: [
            {
              $match: {
                type: "Meals",
                $or: [
                  {
                    $and: [
                      {
                        "availability.startDate": {
                          $gte: weekStartDate,
                        },
                      },
                      {
                        "availability.endDate": {
                          $lte: weekEndDate,
                        },
                      },
                    ],
                  },
                  {
                    "availability.startDate": {
                      $lte: weekStartDate,
                    },
                    frequency: "Every weekday",
                    noEndDate: true,
                  },
                  {
                    "availability.startDate": {
                      $gte: weekStartDate,
                      $lte: weekEndDate,
                    },
                    frequency: "This day only",
                  },
                ],
              },
            },
            // {
            //   $addFields: {
            //     extrasOID: {
            //       $map: {
            //         input: "$extras",
            //         as: "extrasNew",
            //         in: {
            //           oldItemId: "$$extras._id", // Returns ObjectId
            //           _id: { $literal: ObjectId() },
            //         },
            //       },
            //     },
            //   },
            // },
            {
              $lookup: {
                from: "products",
                localField: "extras",
                foreignField: "_id",
                as: "extrasActual",
              },
            },
            {
              $lookup: {
                from: "ingredients",
                localField: "ingredients",
                foreignField: "_id",
                as: "ingredientsActual",
              },
            },
            {
              $group: {
                _id: "$category",
                v: {
                  $push: {
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
          ],
          groceries: [
            {
              $match: {
                type: "Grocery",
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
          ],
        },
      },
    ]);
  } catch (error) {
    //console.log(error);
  }

  //console.log("Reaching");

  // //console.log(products[0].meals[0]["Entrées"][0].items);

  context.result = products;

  return context;
};
