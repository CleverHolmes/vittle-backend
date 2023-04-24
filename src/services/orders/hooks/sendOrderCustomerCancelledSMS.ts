import moment from "moment";

export default async (context: any) => {
  //THIS MESSAGE IS WRONG
  const messageFR = `Merci d'avoir commandé, ${
    context.result.customer.firstName
  }. \n 
  Merci pour votre commande. Nous avons reçu votre commande et nous vous informerons lorsque 
  ${
    context.result.lineItems.length === 1 ? "votre produit" : "vos produits"
  } seront livrés 
  par notre livreur local.\n Voir le reçu: https://beta.vittle.ca?order=${
    context.result._id
  }`;

  const messageEN = `We cancelled your order, ${context.result.customer.firstName}.\n\nYou will not be charged for any portion of your order if a temporary hold was placed on your payment method. This is not a charge and should disappear from your bank statement shortly.\n\nView receipt: https://beta.vittle.ca?order=${context.result._id}`;

  //console.log("Going send order created SMS");

  try {
    const asd = await context.app.service("twilio").create({
      to: context.result.customer.phone,
      message:
        context.result.customer.language === "EN" ? messageEN : messageFR,
    });

    //console.log(asd.sid);
  } catch (error) {
    //console.log(error);

    if (error.status === 400 && error.code == 21610) {
      //handle phone has blacklisted us from receiving any messages
      //hanlde activity add.
      // turn off notifications for phone for this user
    }
  }

  return context;
};
