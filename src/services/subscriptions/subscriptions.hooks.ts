import * as authentication from "@feathersjs/authentication";
import addGiftCardCode from "./hooks/addGiftCardCode";
import sendAutoRenewStatusChangedEmail from "./hooks/sendAutoRenewStatusChangedEmail";
import sendDeliveryPreferencesChangedEmail from "./hooks/sendDeliveryPreferencesChangedEmail";
import sendGiftCardAddedOwnerEmail from "./hooks/sendGiftCardAddedOwnerEmail";
import addSubscriptionIdOnGiftCard from "./hooks/addSubscriptionIdOnGiftCard";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [addGiftCardCode],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      sendDeliveryPreferencesChangedEmail,
      sendAutoRenewStatusChangedEmail,
      addSubscriptionIdOnGiftCard,
      sendGiftCardAddedOwnerEmail,
    ],
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
