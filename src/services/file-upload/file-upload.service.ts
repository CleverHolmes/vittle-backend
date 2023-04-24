// Initializes the `file-upload` service on path `/file-upload`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { FileUpload } from "./file-upload.class";
import hooks from "./file-upload.hooks";
import multer from "multer";
const multipartMiddleware = multer();

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    "file-upload": FileUpload & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/file-upload",
    multipartMiddleware.single("image"),
    function (req: any, res: any, next: any) {
      req.feathers.file = req.file;
      next();
    },
    new FileUpload(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("file-upload");

  service.hooks(hooks);
}
