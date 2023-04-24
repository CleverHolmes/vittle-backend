import app from "../../app";

export default {
  before: {
    all: [],
    find: [
      (context: any) => {
        let query = context.params.query;
        //console.log(query);

        if (query.hasOwnProperty("category")) {
          //console.log("IN CATEGORY NORMAL");
          if (query.category === "All") {
            delete context.params.query.category;
            return context;
          }
        }

        if (query.hasOwnProperty("type")) {
          //console.log("IN TYPE NORMAL");
          if (query.type === "All") {
            delete context.params.query.type;
            return context;
          }
        }

        return context;
      },
      async (context: any) => {
        const query = context.params.query;
        //console.log(query);

        let match: any = {};

        if (!query.hasOwnProperty("searchTerm")) {
          return context;
        }

        if (query.hasOwnProperty("category")) {
          //console.log("IN CATEGORY WITH SEARCH");
          if (query.category !== "All") {
            match.category = query.category;
          } 
        }

        if (query.hasOwnProperty("type")) {
          //console.log("IN type WITH SEARCH");
          if (query.type !== "All") {
            match.type = query.type;
          } 
        }

        if (query.searchTerm.split(" ").length > 1) {
          // let words = query.searchTerm.split(" ").join("|");

          // let regexp = "^\\b(" + words + ")\\b$";

          let expression = new RegExp(
            query.searchTerm
              .split(" ")
              .map((word: any) => {
                return "(?=.*\\b" + word + "\\b)";
              })
              .join("") + ".+"
          );

          match = {
            ...match,
            $text: {
              $search: query.searchTerm
                .split(" ")
                .map((word: any) => {
                  // prettier-ignore
                  return "\"" + word + "\"";
                })
                .join(" "),
              $caseSensitive: false,
            },
          };
          // //console.log(new RegExp(regexp, "gi"));
        } else {
          //@ts-inore
          // match.$or = [
          //   { title: { $regex: new RegExp(query.searchTerm, "gi") } },
          //   { FoodDescription: { $regex: new RegExp(query.searchTerm, "gi") } },
          // ];

          match = {
            ...match,
            $text: {
              // prettier-ignore
              $search: query.searchTerm,
              // $search: "\"" + query.searchTerm + "\"",
              $caseSensitive: false,
            },
          };
        }

        //console.log(match);

        const ing = app.service("ingredients").Model;

        try {
          const aggregate = await ing.aggregate([
            {
              $match: match,
            },
            {
              $limit: query.hasOwnProperty("$limit") ? query.$limit : 50,
            },
          ]);

          //console.log(aggregate.map((e: any) => e.FoodDescription));
          // //console.log(aggregate);

          context.result = aggregate;
        } catch (error) {
          //console.log(error);
          context.error = error;
        }

        return context;
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
