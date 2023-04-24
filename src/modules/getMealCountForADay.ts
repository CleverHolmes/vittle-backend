import moment, { MomentInput } from "moment";
import getProductPlatingDate from "./getProductPlatingDate";

export default (
  cartItems: Array<object>,
  selectedWeek: number,
  day: MomentInput
) => {
  const mealsOnAParticularDay = cartItems
    .filter((e: any) => {
      return (
        e.type === "Meals" &&
        moment(
          getProductPlatingDate(selectedWeek, e.availability || [], "date")
        ).isoWeekday() === moment(day).isoWeekday()
      );
    })
    .reduce((acc: number, current: any) => {
      return acc + current.quantity;
    }, 0);

  return mealsOnAParticularDay;
};
