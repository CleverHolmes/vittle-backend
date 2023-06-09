import VerifySignUpEmail from "../../email-templates/authmanagement/verify-signup";
import DeletedAccount from "../../email-templates/authmanagement/delete-account";
import CreatedAccount from "../../email-templates/authmanagement/create-account";
import ResetPasswordEmail from "../../email-templates/authmanagement/reset-password";
import * as local from "@feathersjs/authentication-local";
const { hashPassword, protect } = local.hooks;

// For testing
const fs = require('fs');
const filePath = './console.log';

export default function noitifer(app) {
  function getLink(type, hash) {
    const url = "https://vittle2.testmyapp.in/" + type + "?token=" + hash;
    return url;
  }

  function sendEmail(email) {
    return app
      .service("mailer")
      .create(email)
      .then(function (result) {
        //console.log("Sent email", result);
      })
      .catch((err) => {
        console.log("Error sending email", err);
      });
  }

  return {
    notifier: async function (type, user, notifierOptions) {
      //console.log("*******************************************************")
      console.log("here is notifier")
     
      //console.log("*******************************************************")
      let tokenLink;
      let email;
      console.log("INSIDE VERIFICATION");
      // console.log(user.hasOwnProperty("dontSendVerifyEmail"))
      //ADD Twinstar 2023/4/21
      if (user.hasOwnProperty("dontSendVerifyEmail")) {
        //console.log("inside dont send set verify");
        if (user.dontSendVerifyEmail == true) {
          return;
        }
      }
      // console.log(user.dontSendVerifyEmail);
      console.log('reset type',type);
      switch (type) {
        case "resendVerifySignup": //sending the user the verification email
          console.log('create new account')

          const _token = user.verifyToken;
          // tokenLink = getLink("verify", tokenLink);

          // if (user.secondary) {
          //   app.service('users').patch()
          // }
          /**
           * Send Notification Email of new registered account to Admin
           */
          const newRegisteredUserName = user.firstName + ' ' + user.lastName;
          const newRegisteredUserEmail = user.email;
          // delete account activities
          const newRegisteredActivity = await app.service("activities").create({
            actionOn: user._id,
            actionBy: "Vittle",
            action: "Create new account",
            data: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            },
          });

          fs.appendFile('file.log', JSON.stringify(newRegisteredActivity), err => {
            if (err) {
              console.error(err);
            }
            // done!
          });
          
          try {
            const fetchData = await app.service('users').find({
              query: { roles: { $in: ["admin"] } },
              lean: true
            });
            const adminUsers = fetchData['data']
            //for testing
            fs.appendFile('file.log', JSON.stringify(adminUsers), err => {
              if (err) {
                console.error(err);
              }
              // done!
            });
            //@ts-ignore
            if (Array.isArray(adminUsers)) {
              adminUsers.forEach(adminuser => {
                // rest of the code here

                email = {
                  from: "Vittle <omar@vittle.ca>",
                  to: adminuser.email,
                  subject: `${user.firstName}, ${user.settings.language === "EN"
                    ? "created account"
                    : "compte créé"
                    }`,
                  html: CreatedAccount({
                    firstName: user.firstName,
                    email: user.email,
                    secondary: user.secondary,  // Secondary Profile
                    language: user.settings.language,
                  }),
                };

                sendEmail(email);
              });
            } else {
              console.error('notifier.ts:98', 'adminUsers is not an array');
            }

          } catch (error) {
            console.log(error)
          }
          /**
           * Send Email to User
           */
          const activity = await app.service("activities").create({
            actionOn: user._id,
            actionBy: "Vittle",
            action: "send verification email",
            data: {
              firstName: user.firstName,
              lastName: user.lastName,
              vittleLogoClick: 0,
              verifyButtonClick: 0,
              emailOpen: 0,
            },
          });

          email = {
            from: "Vittle <omar@vittle.ca>",
            to: user.email,
            subject: `${user.firstName}, ${user.settings.language === "EN"
              ? "verify your account"
              : "vérifie ton compte"
              }`,
            html: VerifySignUpEmail({
              firstName: user.firstName,
              email: user.email,
              activityId: activity._id,
              token:
                "https://beta.vittle.ca/verify-email/" + _token,
              language: user.settings.language,
            }),
          };

          return sendEmail(email);
          break;

        case "verifySignup": // confirming verification
          // tokenLink = getLink("verify", user.verifyToken);
          // email = {
          //   from: "Vittle <omar@vittle.ca>",
          //   to: user.email,
          //   subject: "Confirm Signup",
          //   html: "Thanks for verifying your email",
          // };
          // return sendEmail(email);
          break;

        case "sendResetPwd":
          //console.log("send------reset-------pwd")

          tokenLink = getLink("reset", user.resetToken);
          email = {
            from: "Vittle <omar@vittle.ca>",
            to: user.email,

            subject: `${user.settings.language === "EN"
              ? `${user.firstName}, reset your password`
              : `${user.firstName}, réinitialise ton mot de passe`
              }`,
            html: ResetPasswordEmail({
              firstName: user.firstName,
              token:
                // "https://beta.vittle.ca/reset-password/" +
                "http://localhost:3000/reset-password/" +
                user.resetToken,
              language: user.settings.language,
            }),
          };

          //console.log("RESET PASS");
          // //console.log(user);

          return sendEmail(email);
          break;

        case "resetPwd":
          // console.log(user)
          // tokenLink = getLink("reset", user.resetToken);
          // console.log(tokenLink)
          // const newPassword = '1234567890';
          // user.password = '$2a$10$C75ibOaLyCcWIwQkGoAd7.TzL6PZogyQhfyuzMiuRq3f1skNlfSSO'; //1234567890 bcrypt
          tokenLink = getLink("reset", user.resetToken);
          email = {};
          // return sendEmail(email);
          return 'success';
          break;

        case "passwordChange":
          email = {};
          console.log("passwordchange")
          return sendEmail(email);
          break;

        case "identityChange":
          tokenLink = getLink("verifyChanges", user.verifyToken);
          email = {};
          return sendEmail(email);
          break;
        //ADD Twinstar 2023.4.24
        case "deleteAccount": //sending the user the verification email
          const deletedUserName = user.firstName + ' ' + user.lastName;
          const deletedUserEmail = user.email;
          // delete account activities
          const deleted_activity = await app.service("activities").create({
            actionOn: user._id,
            actionBy: deletedUserName,
            // action: "delete-account",
            action: 'removed account',
            data: {
              firstName: user.firstName,
              lastName: user.lastName,
              vittleLogoClick: 0,
              verifyButtonClick: 0,
              emailOpen: 0,
            },
          });


          try {
            const fetchData = await app.service('users').find({
              query: { roles: { $all: ["admin","owner"] } },
              lean: true
            });
            const adminUsers = fetchData['data']
            //console.log(adminUsers)
            //@ts-ignore
            if (Array.isArray(adminUsers)) {
              adminUsers.forEach(adminuser => {
                // rest of the code here

                email = {
                  from: "Vittle <omar@vittle.ca>",
                  to: adminuser.email,
                  subject: `${user.firstName}, ${user.settings.language === "EN"
                    ? "delete account"
                    : "supprimer le compte"
                    }`,
                  html: DeletedAccount({
                    firstName: user.firstName,
                    email: user.email,
                    secondary: user.secondary,  // Secondary Profile
                    language: user.settings.language,
                  }),
                };

                sendEmail(email);
              });
            } else {
              console.error('adminUsers is not an array');
            }

          } catch (error) {
            console.log(error)
          }

          break;

        default:
          break;
      }
    },
  };
}
