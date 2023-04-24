import { Application } from "../declarations";
import users from "./users/users.service";
import subscriptions from "./subscriptions/subscriptions.service";
import activities from "./activities/activities.service";
import mailchimp from "./mailchimp/mailchimp.service";
import mailer from "./mailer/mailer.service";
import tracker from "./tracker/tracker.service";
import jobs from "./jobs/jobs.service";
import ingredients from "./ingredients/ingredients.service";
import authmanagement from "./authmanagement/authmanagement.service";
import products from "./products/products.service";
import organization from "./organization/organization.service";
import categories from "./categories/categories.service";
import media from "./media/media.service";
import fileUpload from "./file-upload/file-upload.service";
import orders from './orders/orders.service';
import twilio from './twilio/twilio.service';
import plans from './plans/plans.service';
import instructions from './instructions/instructions.service';
import postalCodes from './postal-codes/postal-codes.service';
import routes from './routes/routes.service';
import subscriptionStatuses from './subscription-statuses/subscription-statuses.service';
import giftCards from './gift-cards/gift-cards.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(subscriptions);
  app.configure(activities);
  app.configure(mailchimp);
  app.configure(mailer);
  app.configure(tracker);
  app.configure(jobs);
  app.configure(ingredients);
  app.configure(authmanagement);
  app.configure(products);
  app.configure(organization);
  app.configure(categories);
  app.configure(media);
  app.configure(fileUpload);
  app.configure(orders);
  app.configure(twilio);
  app.configure(plans);
  app.configure(instructions);
  app.configure(postalCodes);
  app.configure(routes);
  app.configure(subscriptionStatuses);
  app.configure(giftCards);
}
