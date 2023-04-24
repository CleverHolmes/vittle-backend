import * as authentication from "@feathersjs/authentication";
// Don't remove this comment. It's needed to format import lines nicely.
const { authenticate } = authentication.hooks;
import AWS from "aws-sdk";
import sharp from "sharp";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_S3,
  secretAccessKey: process.env.AWS_SECRET_S3,
});

export default {
  before: {
    all: [
      //  authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [
      async (context: any) => {
        // //console.log(context.data);
        // DO NOT //console LOG CONTEXT.DATA!
        // //console.log(Object.keys(context.data.file));
        // context.result = context.data.file;
        // return context;
        // //console.log(context.data.parent);

        // //console.log(context.data.imageData);
        let file = { ...context.data.file };
        //console.log(context.data.file);
        const fileBuffer = context.data.file.buffer;

        const s3 = new AWS.S3({
          endpoint: "https://s3.us-east-1.amazonaws.com",
        });

        try {
          // //console.log("Buffer", fileBuffer);
          // //console.log(context.params);

          const putObject: any = await s3
            .putObject({
              Bucket: "vittle-new",
              Key: file.originalName,
              Body: Buffer.from(file.buffer),
              ACL: "public-read",
            })
            .send();

          let Image720;

          if (context.data.hasOwnProperty("croppedData")) {
            Image720 = await sharp(fileBuffer)
              .extract({
                left: parseInt(context.data.croppedData.x, 10),
                top: parseInt(context.data.croppedData.y, 10),
                width: parseInt(context.data.croppedData.width, 10),
                height: parseInt(context.data.croppedData.height, 10),
              })
              .resize({
                width: 720,
                height: 720,
              })
              .toBuffer();
          } else {
            Image720 = await sharp(fileBuffer)
              .resize({
                width: 720,
                height: 720,
              })
              .toBuffer();
          }

          await s3
            .putObject({
              Bucket: "vittle-new",
              Key:
                file.originalName.split(".")[0] +
                "-preivew." +
                file.originalName.split(".")[1],
              Body: Buffer.from(Image720),
              ACL: "public-read",
            })
            .send();

          let uploadedMedia: any = await context.app.service("media").create({
            name: file.originalName,
            type: "picture",
            transforms: [
              { type: "large", path: file.originalName },
              {
                type: "preview",
                path:
                  file.originalName.split(".")[0] +
                  "-preivew." +
                  file.originalName.split(".")[1],
              },
            ],
          });

          //console.log("SUCCESS");
          // //console.log(putObject);
          context.result = uploadedMedia;
        } catch (err) {
          //console.log("ERROR");
          //console.log(err);
          context.error = err;
        }
``
        //console.log(context.result);

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
