import app from "../app";
import whatYouAreEatingTemplate from "../email-templates/order/whatYouAreEating";
import { Application } from "@feathersjs/feathers";
import moment from "moment";

export default (app: Application) => {
  app.get("agenda").define("cutoffReminderJob", async (job: any) => {
    //console.log("Going in cutoffReminderJob");

    //@ts-ignore
    // const { subscriptionId } = job.attrs.data;

    const tuesday = moment().startOf("isoWeek").day(2).format("YYYY-MM-DD");
    //console.log(tuesday);

    try {
      //   await app.service("subscriptions").patch(subscriptionId, {
      //     status: "active",
      //   });

      const allCustomersWithTheirOrders = await app
        .service("subscriptions")
        .Model.aggregate([
          {
            $match: {
              // "paused", "cancelled"
              status: { $in: ["active", "paused"] },
            },
          },
          {
            $addFields: {
              subscriptionId: {
                $toString: "$_id",
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "subscriptionId",
              foreignField: "subscriptionId",
              as: "users",
            },
          },
          {
            $lookup: {
              from: "subscriptionstatuses",
              as: "subscriptionstatuses",
              localField: "subscriptionId",
              foreignField: "subscriptionId",
            },
          },
        ])
        .exec();

      const productsForReminderWeek = await app
        .service("products")
        .Model.aggregate([
          {
            $match: {
              type: "Meals",
              $or: [
                {
                  $and: [
                    {
                      "availability.startDate": {
                        $gte: moment(tuesday)
                          .add(1, "w")
                          .startOf("isoWeek")
                          .toISOString(),
                      },
                    },
                    {
                      "availability.endDate": {
                        $lte: moment(tuesday)
                          .add(1, "w")
                          .startOf("isoWeek")
                          .day(5)
                          .toISOString(),
                      },
                    },
                  ],
                },
                {
                  "availability.startDate": {
                    $lte: moment(tuesday)
                      .add(1, "w")
                      .startOf("isoWeek")
                      .toISOString(),
                  },
                  frequency: "Every weekday",
                  noEndDate: true,
                },
                {
                  "availability.startDate": {
                    $gte: moment(tuesday)
                      .add(1, "w")
                      .startOf("isoWeek")
                      .toISOString(),
                    $lte: moment(tuesday)
                      .add(1, "w")
                      .startOf("isoWeek")
                      .day(5)
                      .toISOString(),
                  },
                  frequency: "This day only",
                },
              ],
            },
          },
        ])
        .exec();

      // //console.log(productsForReminderWeek);
      //console.log(productsForReminderWeek.length);

      // //console.log(allCustomersWithTheirOrders);

      for (let index = 0; index < allCustomersWithTheirOrders.length; index++) {
        const element = allCustomersWithTheirOrders[index];

        if (element.status === "active") {
          element.users.forEach((user: any) => {
            //console.log(user.firstName, user.lastName, "active");

            const mailSent = app.service("mailer").create({
              from: `Vittle <omar@vittle.ca>`,
              // to: user.emailAddress,
              to: [
                "jivanyesh@gmail.com",
                "jeremy.bellefeuille@gmail.com",
                "omar@vittle.ca",
              ],
              // cc: ["jivanyesh@gmail.com"],
              subject: user.firstName + ", here's what you're eating",
              //@ts-ignore
              html: whatYouAreEatingTemplate({
                headingPart: "here's what you're eating",
                subheading:
                  "Modify meals, add products, or edit delivery preferences on or before Wednesday 11:59 p.m.",
                firstName: user.firstName,
                lineItems: productsForReminderWeek,
              }),
            });
          });
        }

        if (element.status === "paused") {
          element.users.forEach((user: any) => {
            //console.log(user.firstName, user.lastName, "paused");

            const mailSent = app.service("mailer").create({
              from: `Vittle <omar@vittle.ca>`,
              // to: user.emailAddress,
              to: [
                "jivanyesh@gmail.com",
                "jeremy.bellefeuille@gmail.com",
                "omar@vittle.ca",
              ],
              // cc: ["jivanyesh@gmail.com"],
              subject: user.firstName + ", here's what you're missing out on",
              //@ts-ignore
              html: whatYouAreEatingTemplate({
                headingPart: "here's what you're missing out on",
                subheading: "Subscribe before Wednesday 11:59 p.m.",
                firstName: user.firstName,
                lineItems: productsForReminderWeek,
              }),
            });
          });
        }
      }

      // customer with orders remind them what they are eating and the time they have to change/modify their order
      // customers who are paused remind them of what they could be eating the next week and the time they have to change/modify their order

      // const activity = await app.service("activities").create({
      //   actionOn: context.params.user._id,
      //   actionBy: `${context.params.user.firstName} ${context.params.user.lastName}`,
      //   action: "send-reminder-email",
      //   data: {
      //     firstName: context.params.user.firstName,
      //     lastName: context.params.user.lastName,
      //   },
      // });

      //ToDo: Create an activity after
    } catch (error) {
      //console.log("Error in cutoffReminderJob");
      //console.log("Error in try/catch");
      //console.log(error);
      job.fail();
    }
  });
};
