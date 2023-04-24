import moment from "moment";

export default async (context: any) => {
  // //console.log("In products");
  // //console.log(context.arguments[0].query);
  //console.log("Going in instructions search search");

  if (!context.arguments[0].query) {
    return context;
  }

  if (!context.arguments[0].query.hasOwnProperty("searchTerm")) {
    return context;
  }

  //console.log("Going in instructions search search: query satisfied");

  let instructions = [];

  try {
    instructions = await context.app.service("instructions").Model.aggregate([
      {
        $match: {
          //   $or: [
          // {
          title: new RegExp(context.arguments[0].query.searchTerm, "ig"),
          // }
          //   ],
        },
      },
    ]);
  } catch (error) {
    //console.log(error);
  }

  context.result = instructions;

  return context;
};
