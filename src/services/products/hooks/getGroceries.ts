export default async (context: any) => {
  //console.log("In groceries");

  if (!context.arguments[0].query) {
    return context;
  }

  if (!context.arguments[0].query.hasOwnProperty("type")) {
    return context;
  }

  if (context.arguments[0].query.type !== "Grocery") {
    return context;
  }

  let groceries = [];

  try {
    groceries = await context.app.service("products").Model.aggregate([
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
    ]);
  } catch (error) {
    //console.log(error);
  }

  //console.log(groceries);

  if (groceries.length > 0) {
    context.result = groceries;
  }

  return context;
};
