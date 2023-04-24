import checkIfUserExists from "./checkIfUserExists";
import createAutoCaptureGroceryOrderJob from "./createAutoCaptureGroceryOrderJob";
import sendCustomerReceiptEmail from "./sendCustomerReceiptEmail";
import resendCustomerReceiptByStatus from "./resendCustomerReceiptByStatus";
import sendNewOrderEmail from "./sendNewOrderEmail";
import sendReportAProblemEmail from "./sendReportAProblemEmail";

import customerCancel from "./customerCancel";
import sendOwnerOrderCancelledEmail from "./sendOwnerOrderCancelledEmail";

import sendOrderPlacedSMS from "./hooks/sendOrderPlacedSMS";
import addSubscriptionData from "./hooks/addSubscriptionData";
import sendWhatYouAreEatingEmail from "./hooks/sendWhatYouAreEatingEmail";
import createSubscriptionActivationJob from "./hooks/createSubscriptionActivationJob";
import groupLineItemsByDay from "./hooks/groupLineItemsByDay";
import addSelectedWeekStartDate from "./hooks/addSelectedWeekStartDate";
import findCustomerOrders from "./hooks/findCustomerOrders";
import getDeliveryOrders from "./hooks/getDeliveryOrders";
import getPlatingItems from "./hooks/getPlatingItems";
import addCustomerIdToOrder from "./hooks/addCustomerIdToOrder";
import handleDeliveryStatusChange from "./hooks/handleDeliveryStatusChange";
import createGiftCardCode from "./hooks/createGiftCardCode";
import sendGiftCardPurchasedOwnerEmail from "./hooks/sendGiftCardPurchasedOwnerEmail";
import sendGiftCardRecipientEmail from "./hooks/sendGiftCardRecipientEmail";

export default {
  before: {
    all: [],
    find: [findCustomerOrders],
    get: [getPlatingItems, getDeliveryOrders],
    create: [
      addSelectedWeekStartDate,
      groupLineItemsByDay,
      addCustomerIdToOrder,
      createGiftCardCode,
    ],
    update: [],
    patch: [
      resendCustomerReceiptByStatus,
      customerCancel,
      handleDeliveryStatusChange,
    ],
    remove: [],
  },

  after: {
    all: [],  
    find: [],
    get: [],
    create: [
      sendCustomerReceiptEmail,
      sendWhatYouAreEatingEmail,
      sendOrderPlacedSMS,
      sendNewOrderEmail,
      createAutoCaptureGroceryOrderJob,
      checkIfUserExists,
      addSubscriptionData,
      sendGiftCardPurchasedOwnerEmail,
      sendGiftCardRecipientEmail,
    ],
    update: [],
    patch: [sendReportAProblemEmail, sendOwnerOrderCancelledEmail],
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
