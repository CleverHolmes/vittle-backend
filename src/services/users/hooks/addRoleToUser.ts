import isAdmin from "../../../modules/isAdmin";

export default async function addCustomerRole(context: any) {
  //check if admin is on

  let roles: Array<string> = [];
  let signedInUserIsAdmin = false;
  //user is signed in
  if (context.params.user) {
    if (context.params.user.hasOwnProperty("roles")) {
      signedInUserIsAdmin = isAdmin(context.params.user.roles);
    }
  }

  if (context.data.hasOwnProperty("roles")) {
    if (context.data.roles.indexOf("admin") >= 0 && !signedInUserIsAdmin) {
      roles = [
        ...context.data.roles.filter((role: string) => role !== "admin"),
      ];
    }
  }

  if (roles.indexOf("customer") === -1) {
    roles.push("customer");
  }

  try {
    await context.app.service("users").patch(context.result._id, {
      roles,
    });
  } catch (error) {
    //console.log(error);
  }

  return context;
}
