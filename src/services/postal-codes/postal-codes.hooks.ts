import * as authentication from "@feathersjs/authentication";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [
      async (context: any) => {
        const query = context.params.query;
        //console.log(query.search);

        if (!query.search) {
          return context;
        }

        //@ts-ignore

        const Users = app.service("ingredients").Model;

        const aggregate = await Users.aggregate([
          {
            $match: { code: { $regex: new RegExp(query.search, "ig") } },
          },
          {
            $limit: 25,
          },
        ]);

        //console.log(aggregate);

        if (aggregate.length > 0) {
          context.result = aggregate;
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
