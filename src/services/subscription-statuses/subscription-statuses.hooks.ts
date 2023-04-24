import * as authentication from "@feathersjs/authentication";
import moment from "moment";
import notifyAdminOnPause from "./hooks/sendPausedAdminEmail";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [
      async (context: any) => {
        context.params.query.customerId = context.params.user._id;
        context.params.query.subscriptionId =
          context.params.user.subscriptionId;

        return context;
      },
    ],
    get: [],
    create: [
      async (context: any) => {
        //console.log("going before create");
        //console.log(context.data);

        context.data.customerId = context.params.user._id;

        context.data.subscriptionId = context.params.user.subscriptionId;

        context.data.weekOf = moment()
          .add(context.data.selectedWeek, "w")
          .startOf("isoWeek")
          .format("YYYY-MM-DD");

        //console.log(context.data);

        const selectedWeek = context.data.selectedWeek;

        //console.log(selectedWeek);

        console.log(
          moment()
            .add(selectedWeek - 1, "w")
            .startOf("isoWeek")
            .add(3, "d")
            .set("h", 0)
            .set("minute", 0)
            .format("YYYY-MM-DD H:mm:s")
        );
        console.log(
          moment().isSameOrAfter(
            moment()
              .add(selectedWeek - 1, "w")
              .startOf("isoWeek")
              .add(4, "d")
              .set("h", 0)
              .set("minute", 0)
          )
        );

        if (
          moment().isSameOrAfter(
            moment()
              .add(selectedWeek - 1, "w")
              .startOf("isoWeek")
              .add(3, "d")
              .set("h", 0)
              .set("minute", 0)
          )
        ) {
          //console.log("un here 2");
          context.error = new Error("This week cannot be paused");
          return context;
        }

        delete context.data.selectedWeek;

        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [notifyAdminOnPause],
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
