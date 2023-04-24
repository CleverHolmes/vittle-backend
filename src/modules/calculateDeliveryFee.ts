import moment from "moment";
import getMealCountForADay from "../modules/getMealCountForADay";

export default (
  cartItems: Array<object>,
  selectedWeek: number,
  deliveryTime: string,
  selectedMealPlanName: string,
  selectedMealPlan?: object | null
) => {
  let deliveryFee = 0,
    deliveryCharge = 3.5;

  //@ts-ignore
  if (selectedMealPlanName !== "a-la-carte" && selectedMealPlan !== null) {
    //@ts-ignore
    if (selectedMealPlan.freeDelivery) {
      return 0;
    }
  }

  const weekStartDate = moment().add(selectedWeek, "w").startOf("isoWeek");

  for (let i = 0; i < 5; i++) {
    const mealsOnThisDay = getMealCountForADay(
      cartItems,
      selectedWeek,
      moment(weekStartDate).add(i, "d").format("D, MMMM, YYYY")
    );

    if (mealsOnThisDay > 0) {
      //Groceries fee check
      if (
        i == 1 &&
        cartItems.findIndex((e: any) => e.type === "Grocery") >= 0
      ) {
        if (mealsOnThisDay >= 1) {
          // no fee if just 1 meal and groceries
          continue;
        }

        if (mealsOnThisDay == 0) {
          let cartGroceries = cartItems
            .filter((e: any) => e.type === "Grocery")
            .reduce(
              (acc: number, curr: any) => acc + curr.quantity * curr.price,
              0
            );

          if (cartGroceries < 100) {
            deliveryFee += deliveryCharge;
          }
        }
      }

      if (deliveryTime === "dayOf") {
        deliveryFee += deliveryCharge;
      }

      if (deliveryTime === "nightBefore" && mealsOnThisDay < 2) {
        deliveryFee += deliveryCharge;
      }
    }
  }

  //console.log("Final fee", deliveryFee);

  return deliveryFee;
};
