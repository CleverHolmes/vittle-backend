import moment from "moment";
import currency from "currency.js";
import newOrderTemplate from "../../email-templates/order/owner";
import calculateOrderLineItems from "../../modules/calculateOrderLineItems";
import getMealCountForADay from "../../modules/getMealCountForADay";
import getExtrasTotalOnWholeOrder from "../../modules/getExtrasTotalOnWholeOrder";

export default async (context: any) => {
  //console.log("Going into after create new order email");

  const order = context.result;

  if (order.hasOwnProperty("autoRenewOrder")) {
    if (order.autoRenewOrder) {
      return context;
    }
  }

  if (context.result.type === "giftCard") {
    return context;
  }

  let cardLast4 = "";
  let cardBrand = "";
  let subject = "";
  let subjectMealPlanDate = "";
  let hasGroceries = false;
  let hasMeals = false;
  let schedule: Array<string> = [];

  if (order.type !== "mealPlan") {
    if (order.paymentType === "card") {
      const paymentIntent = await context.app
        .service("/stripe/payment-intent")
        .get(context.result.paymentIntentId);

      cardLast4 =
        paymentIntent.charges.data[0].payment_method_details.card.last4;
      cardBrand =
        paymentIntent.charges.data[0].payment_method_details.card.brand;
    }
  }

  if (order.customer.language) {
    moment.locale(order.customer.language.toLowerCase());
  }

  //assume grocery only
  subject = `${order.customer.firstName} bought groceries for ${currency(
    context.result.total
  ).format()}`;

  if (order.lineItems.findIndex((e: any) => e.type === "Meals") >= 0) {
    //console.log("Inside has meals");
    hasMeals = true;
  }

  if (order.lineItems.findIndex((e: any) => e.type === "Grocery") >= 0) {
    //console.log("Inside has groceries");
    hasGroceries = true;
  }

  if (hasMeals && hasGroceries) {
    subject = `${
      order.customer.firstName
    } bought meals and groceries for ${currency(
      context.result.total
    ).format()}`;
  }

  if (!hasGroceries && hasMeals) {
    subject = `${order.customer.firstName} bought meals for ${currency(
      context.result.total
    ).format()}`;
  }

  if (
    context.result.mealPlanSelected !== "" &&
    context.result.mealPlanSelectedPlan !== "a-la-carte" &&
    context.result.mealPlan !== null
  ) {
    const weekMonth = moment()
      .add(context.result.selectedWeek, "w")
      .format("MMMM");
    const weekStartDate = moment()
      .add(context.result.selectedWeek, "w")
      .startOf("isoWeek")
      .format("D");
    const weekEndDate = moment()
      .add(context.result.selectedWeek, "w")
      .startOf("isoWeek")
      .add(4, "d")
      .format("D");
    subject = `${order.customer.firstName} subscribed to a meal plan`;
    subjectMealPlanDate = `for ${weekMonth} ${weekStartDate}-${weekEndDate}`;

    schedule = [0, 1, 2, 3, 4].map((e: any) => {
      let day = moment()
        .add(order.selectedWeek, "w")
        .startOf("isoWeek")
        .add(e, "d");

      const mealCountForADay = getMealCountForADay(
        order.lineItems,
        order.selectedWeek,
        day
      );

      if (mealCountForADay > 0) {
        if (order.delivery.time === "nightBefore") {
          return moment()
            .add(order.selectedWeek, "w")
            .startOf("isoWeek")
            .add(e, "d")
            .subtract(1, "d")
            .format("dddd, MMMM D");
        } else {
          return moment()
            .add(order.selectedWeek, "w")
            .startOf("isoWeek")
            .add(e, "d")
            .format("dddd, MMMM D");
        }
      }

      return "";
    });
  }

  try {
    const mailSent = context.app.service("mailer").create({
      from: `Vittle <omar@vittle.ca>`,
      to: [
        // "omar@vittle.ca",
        // "jeremy.bellefeuille@gmail.com",
        "jivanyesh@gmail.com",
      ],
      subject,
      //@ts-ignore
      html: newOrderTemplate({
        //@ts-ignore
        subject,
        subjectMealPlanDate,
        orderId: context.result._id,
        firstName: order.customer.firstName,
        language: order.customer.language,
        orderDate: moment(context.result.createdAt).format(
          `MMMM D[,] YYYY [${
            order.customer.language === "FR" ? "à" : "at"
          }] HH:mm a`
        ),
        lineItems: context.result.lineItems,
        total: context.result.total,

        // hasMeals:
        //   context.result.lineItems.filter((e: any) => e.type === "Meals")
        //     .length > 0,

        schedule,
        autoRenew: context.result.autoRenew,

        selectedMealPlan: context.result.selectedMealPlan,
        selectedMealPlanName: context.result.selectedMealPlanName,

        customerLanguage: context.result.customer.language,

        deliveryDate: context.result.delivery.date,
        deliveryType: context.result.delivery.type,
        deliveryTime: context.result.delivery.time,
        selectedWeek: context.result.selectedWeek,

        address: context.result.address,

        orderLineItems: calculateOrderLineItems({
          lineItems: context.result.lineItems,
          deliveryType: context.result.delivery.type,
          deliveryTime: context.result.delivery.time,
          selectedWeek: context.result.selectedWeek,
          selectedMealPlan: context.result.selectedMealPlan,
          selectedMealPlanName: context.result.selectedMealPlanName,
        }),

        hasExtras: getExtrasTotalOnWholeOrder(context.result.lineItems) > 0,

        paymentIntentId: context.result.paymentIntentId,
        cardLast4,
        cardBrand,
      }),
    });

    //console.log(mailSent);
  } catch (error) {
    //console.error(error);
  }
};
