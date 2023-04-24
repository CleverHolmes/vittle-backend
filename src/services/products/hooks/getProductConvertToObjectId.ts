import mongoose from "mongoose";

export default async (context: any) => {
  //console.log(context.data);

  if (
    !context.data.hasOwnProperty("extras") ||
    !context.data.hasOwnProperty("ingredients")
  ) {
    return context;
  }

  let extrasObjectIdArray = [];
  let ingredientsObjectIdArray = [];

  //@ts-ignore
  if (context.data.extras.length > 0) {
    extrasObjectIdArray = context.data.extras.map((e: object) =>
      //@ts-ignore
      mongoose.Types.ObjectId(e._id)
    );
  }

  //@ts-ignore
  if (context.data.ingredients.length > 0) {
    ingredientsObjectIdArray = context.data.ingredients.map((e: object) =>
      //@ts-ignore
      mongoose.Types.ObjectId(e._id)
    );
  }

  context.data.ingredientIds = ingredientsObjectIdArray;
  context.data.extraIds = extrasObjectIdArray;

  //console.log("After objectId add");
  //console.log(context.data);

  return context;
};
