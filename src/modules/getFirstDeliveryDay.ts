import moment from "moment";
import getMealCountForADay from "./getMealCountForADay";

export default function (
  cartItems: Array<object>,
  selectedWeek: number,
  deliveryTime: string,
  selectedMealPlan: string
) {
  let weekDay = 0;

  if (selectedMealPlan !== "" && selectedMealPlan !== "a-la-carte") {
    return moment()
      .add(selectedWeek, "w")
      .isoWeekday(1)
      .add(deliveryTime === "nightBefore" ? -1 : weekDay, "d")
      .format("dddd, MMMM Do");
  }

  const groceriesExist =
    cartItems.findIndex((e: any) => e.type === "Grocery") !== -1;

  for (let index = 0; index < [0, 1, 2, 3, 4].length; index++) {
    const el = [0, 1, 2, 3, 4][index];

    if (index === 1 && groceriesExist) {
      return moment()
        .add(selectedWeek, "w")
        .isoWeekday(1)
        .add(1, "d")
        .format("dddd, MMMM Do");
    }

    if (
      getMealCountForADay(
        cartItems,
        selectedWeek,
        moment().add(selectedWeek, "w").isoWeekday(1).add(el, "d")
      ) === 0
    ) {
      continue;
    }

    weekDay = index;
    break;
  }

  return moment()
    .add(selectedWeek, "w")
    .isoWeekday(1)
    .add(deliveryTime === "nightBefore" ? weekDay - 1 : weekDay, "d")
    .format("dddd, MMMM Do");
}
