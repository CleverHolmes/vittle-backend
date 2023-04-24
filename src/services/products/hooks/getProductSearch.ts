import moment from "moment";

export default async (context: any) => {
  // //console.log("In products");
  // //console.log(context.arguments[0].query);
  //console.log("Going in get product search");

  if (!context.params.query.hasOwnProperty("searchTerm")) {
    return context;
  }

  let products = [];
  let type = "";

  if (context.params.query.hasOwnProperty("type")) {
    type = context.params.query.type;
  }

  try {
    products = await context.app.service("products").Model.aggregate([
      {
        $match: {
          type: type || "Meals",
          $or: [
            {
              title: new RegExp(context.arguments[0].query.searchTerm, "ig"),
            },
            {
              description: new RegExp(
                context.arguments[0].query.searchTerm,
                "ig"
              ),
            },
          ],
        },
      },
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
    ]);

    //console.log("In product result");
    //console.log(products.length);
  } catch (error) {
    //console.log(error);
  }

  context.result = products;

  return context;
};
