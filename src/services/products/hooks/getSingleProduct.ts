import mongoose from "mongoose";
const { NotFound, GeneralError, BadRequest } = require("@feathersjs/errors");

export default async (context: any) => {
  //console.log("get product with associations");

  //console.log(context.id);

  if (!context.params.query.hasOwnProperty("associations")) {
    return context;
  }

  if (context.params.query.associations) {
  }

  let product = null;

  try {
    product = await context.app.service("products").Model.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(context.id),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "extraIds",
          foreignField: "_id",
          as: "extrasAdded",
        },
      },
      {
        $lookup: {
          from: "ingredients",
          localField: "ingredientIds",
          foreignField: "_id",
          as: "ingredientsAdded",
        },
      },
    ]);
  } catch (error) {
    //console.log(error);
    context.error = error;
  }

  //console.log(product);

  if (product.length) {
    context.result = product[0];

    return context;
  }

  const notFound = new NotFound("Product does not exist");

  context.error = notFound;

  return context;
};
