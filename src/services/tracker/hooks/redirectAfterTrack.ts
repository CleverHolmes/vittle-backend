import { Application } from "../../../declarations";
import app from "../../../app";

export default function redirectAfterTrack(req: any, res: any, next: Function) {
  try {
    if (req.query.redirect) {
      //console.log("Going in redirectAfterTrack");

      return res.redirect(301, req.query.redirect);
    }
  } catch (error) {
    //console.log(error);
  }

  //   if (req.query)
  next();
}
