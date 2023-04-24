import { Application } from "../../../declarations";
import app from "../../../app";

export default function serveImageEmailOpenTrack(
  req: any,
  res: any,
  next: Function
) {
  try {
    if (req.query.track === "emailOpen") {
      //console.log("Going in serveImageEmailOpenTrack");

      const TRANSPARENT_GIF_BUFFER = Buffer.from(
        "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=",
        "base64"
      );

      res.writeHead(200, { "Content-Type": "image/gif" });
      res.end(TRANSPARENT_GIF_BUFFER, "binary");
    } else {
      next();
    }
  } catch (error) {
    //console.log(error);
  }
}
