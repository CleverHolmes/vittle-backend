import mongoose from "mongoose";

export default async (context: any) => {
  //console.log("Find customer orders");

  //Check if user is signed in else return nothing
  //Check user role
  // if role is admin return all orders
  // else if role is customer return only their orders

  try {
    if (context.params.user == null) {
      return context;
    }

    if (context.params.user.roles.indexOf("admin") === -1) {
      context.params.query.customerId = context.params.user._id;
    }
    // context.params.query.customerId = context.params.user._id;
  } catch (error) {
    //console.log(error);
  }

  return context;
};
