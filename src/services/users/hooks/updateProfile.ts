export default async function (context: any) {
  //console.log("feathers backend context", context.data)
  if(context.data.tag == "update-profile"){
    //console.log("feathers backend context", context.data.data)
  }
  // //console.log(context.result);
  // //console.log("USER PATCH");

  //   if (
  //     context.params.user.hasOwnProperty("birthdayDay") &&
  //     context.params.user.hasOwnProperty("birthdayMonth") &&
  //     (context.data.birthdayMonth !== "" || context.data.birthdayDay !== "")
  //   ) {
  //     delete context.data.birthdayMonth;
  //     delete context.data.birthdayDay;
  //   }

  //   //console.log(
  //     context.data.hasOwnProperty("birthdayDay") &&
  //       context.data.hasOwnProperty("birthdayMonth")
  //   );

  //   if (
  //     context.data.hasOwnProperty("birthdayDay") &&
  //     context.data.hasOwnProperty("birthdayMonth")
  //   ) {
  //     //console.log(context.data.birthdayDay);
  //     context.data.birthdayDay = parseInt(context.data.birthdayDay);
  //     context.data.birthdayMonth = parseInt(context.data.birthdayMonth);
  //   }

  //   //console.log(context.data);

  return context;
}