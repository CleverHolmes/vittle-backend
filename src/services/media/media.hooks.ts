import * as authentication from "@feathersjs/authentication";
// Don't remove this comment. It's needed to format import lines nicely.
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_S3,
  secretAccessKey: process.env.AWS_SECRET_S3,
});

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [
      (context: any) => {
        //console.log("BEFORE MEDIA FIND");
        //console.log(context.params.query);

        if (context.params.query.hasOwnProperty("name")) {
          context.params.query.name = {
            $regex: new RegExp(`${context.params.query.name}`, "ig"),
          };
        }
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      async (context: any) => {
        const s3 = new AWS.S3({
          endpoint: "https://s3.us-east-1.amazonaws.com",
        });

        //console.log(context.id);
        //console.log(context.data);

        const media = await context.app.service("media").get(context.id);

        if (!media) {
          throw new Error("There was a problem removing media.");
        }

        //console.log(media.name);

        try {
          const deleteObjects = await s3
            .deleteObjects({
              Bucket: "vittle-new",
              Delete: {
                Objects: [
                  {
                    Key: media.name,
                  },
                  {
                    Key: media.name + "-preview",
                  },
                ],
              },
            })
            .send();
        } catch (error) {
          //console.log(error);
        }

        return context;
      },
    ],
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
