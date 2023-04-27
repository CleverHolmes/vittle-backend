import * as feathersAuthentication from "@feathersjs/authentication";
import * as local from "@feathersjs/authentication-local";

import sendWelcomeEmailAfterSignUp from "./hooks/sendEmailAfterFirstSignUp";
import createSubscription from "./hooks/createSubscription";

import changePasswordActivity from "./hooks/changePasswordActivity";
import changeLanguageActivity from "./hooks/changeLanguageActivity";
import updateAddressList from "./hooks/updateAddressList";
import updateProfile from "./hooks/updateProfile";
import addSecondaryUserIdToPrimaryAccount from "./hooks/addSecondaryUserIdToPrimaryAccount";
import addPasswordToGuestAccount from "./hooks/addPasswordToGuestAccount";
import sendAddressUpdateEmail from "./hooks/sendAddressUpdateEmail";
import createStripeCustomer from "./hooks/createStripeCustomer";
import addRoleToUser from "./hooks/addRoleToUser";

const verifyHooks = require("feathers-authentication-management").hooks;
import accountService from "../authmanagement/notifier";

import app from "../../app";
import addAddressUpdateActivity from "./hooks/addAddressUpdateActivity";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [
      //authenticate('jwt')

      async (context: any) => {

        const query = context.params.query;

        //EDIT Twinstar 2023/4/21
        query.deleted = false;

        // console.log(query)

        if (!query.hasOwnProperty("search")) {
          return context;
        }
        console.log("users.hooks.before");
        //console.log(query);

        let match = {};

        if (!query.search) {
          return context;
        } else {
          //@ts-ignore
          match.$or = [
            { firstName: { $regex: new RegExp(query.search, "ig") } },
            { lastName: { $regex: new RegExp(query.search, "ig") } },
          ];
        }

        //console.log("Going with search query param");

        const Users = app.service("users").Model;

        const aggregate = await Users.aggregate([
          {
            $match: match,
          },
        ]).exec();

        //console.log(aggregate);

        if (aggregate.length > 0) {
          context.result = aggregate;
        }

        return context;
      },
    ],
    get: [
      // authenticate("jwt")
    ],
    create: [hashPassword("password"), verifyHooks.addVerification(), 
      async (context: any) => { console.log(context) }
    

    ],
    update: [
      hashPassword("password"),
      //authenticate("jwt")
      // async (context: any) => { console.log('update')}
    ],
    patch: [
      // hashPassword("password"),
      addPasswordToGuestAccount,
      async (context: any) => { console.log('patch')}

      // (context: any) => {
      //   if (context.data.password == true && context.data.token == true ) {
      //     // const users: any = await app.service("users").find({
      //     //   query: {
      //     //     subscriptionId: subscriptionId,
      //     //   },
      //     // });
      //     console.log('setnewpassword')
          
      //   }
      // },

    ],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [
      createSubscription,
      createStripeCustomer,
      sendWelcomeEmailAfterSignUp,
      addSecondaryUserIdToPrimaryAccount,
      addRoleToUser,
      async (context: any) => {
        accountService(context.app).notifier(
          "resendVerifySignup",
          context.result
        );
      },
      verifyHooks.removeVerification(),
    ],
    update: [],
    patch: [
      (context: any) => {
        if (context.data.deleted == true) {
          console.log('delete')
          accountService(context.app).notifier(
            "deleteAccount",
            context.result
          );
        }
      },
      changePasswordActivity,
      changeLanguageActivity,
      updateProfile,
      sendAddressUpdateEmail,
      addAddressUpdateActivity,

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
