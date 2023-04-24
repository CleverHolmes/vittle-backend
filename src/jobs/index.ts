//@ts-ignore
import { Application } from "@feathersjs/feathers";

import sendSetPasswordEmailJob from "./sendSetPasswordEmailJob";
import autoCaptureGroceryOrderJob from "./autoCaptureGroceryOrder";
import mainBillingJob from "./mainBillingJob";
import chargeJob from "./chargeJob";
import activateSubscriptionJob from "./activateSubscriptionJob";
import createAutoRenewOrderJob from "./createAutoRenewOrderJob";
import cutoffReminderJob from "./cutoffReminderJob";

export default (app: Application) => {
  sendSetPasswordEmailJob(app);
  autoCaptureGroceryOrderJob(app);
  activateSubscriptionJob(app);
  mainBillingJob(app);
  chargeJob(app);
  createAutoRenewOrderJob(app);
  cutoffReminderJob(app);
};
