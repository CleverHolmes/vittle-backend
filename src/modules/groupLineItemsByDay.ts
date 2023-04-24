import moment from "moment";
import getProductPlatingDate from "./getProductPlatingDate";

export default function (
  lineItems: Array<any>,
  selectedWeek: number
): Array<any> {
  let itemsGroupedByDay: any = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };

  for (let index = 0; index < 6; index++) {
    const day = moment()
      .add(selectedWeek, "w")
      .startOf("isoWeek")
      .add(index, "d")
      .format("YYYY-MM-DD");

    for (let itemIndex = 0; itemIndex < lineItems.length; itemIndex++) {
      const item = lineItems[itemIndex];

      if (
        day ===
        moment(
          getProductPlatingDate(selectedWeek, item.availability, "date")
        ).format("YYYY-MM-DD")
      ) {
        itemsGroupedByDay[index].push(item);
      }
    }
  }

  return itemsGroupedByDay;
}
