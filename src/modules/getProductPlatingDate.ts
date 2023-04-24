import moment from "moment";

export default (
  selectedWeek: number,
  availability: Array<object>,
  type: string | undefined = undefined
) => {
  const weekStartDate = moment()
    .add(selectedWeek, "w")
    .startOf("isoWeek")
    .isoWeekday(1);
  const weekEndDate = moment()
    .add(selectedWeek, "w")
    .startOf("isoWeek")
    .add(5, "d");

  const availabilityFound = availability.find((e: any) => {
    if (
      moment(e.startDate).isSameOrBefore(weekEndDate, "day") &&
      e.frequency === "Every weekday"
    ) {
      return true;
    }

    if (
      moment(e.startDate).isBetween(weekStartDate, weekEndDate, "days", "[]") &&
      e.frequency === "This day only"
    ) {
      // //console.log('In 2nd condition');
      return true;
    }

    // //console.log('After 2nd condition');
  });

  // //console.log('yes');
  // //console.log(availabilityFound);

  if (availabilityFound) {
    //@ts-ignore
    if (availabilityFound?.frequency === "Every weekday") {
      if (type === "date") {
        return weekStartDate;
      }

      return "Any day of the week";
    }

    //@ts-ignore
    if (availabilityFound?.frequency === "This day only") {
      if (type === "date") {
        //@ts-ignore
        return moment(availabilityFound.startDate);
      }

      //@ts-ignore
      return moment(availabilityFound?.startDate).format("dddd, MMMM D");
    }
    //@ts-ignore
  }
};
