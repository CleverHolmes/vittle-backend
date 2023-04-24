export default async function (context: any) {
  if (context.result.secondary) {
    await context.app.service("users").patch(context.result.primaryAccountId, {
      $push: {
        secondaryAccounts: context.result._id,
      },
    });
  }

  return context;
}
