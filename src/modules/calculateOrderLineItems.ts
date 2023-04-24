import currency from "currency.js";
import calculateDeliveryFee from "./calculateDeliveryFee";
import getExtrasTotalOnWholeOrder from "./getExtrasTotalOnWholeOrder";

interface calculateOrderLineItemsProps {
  lineItems: Array<Object>;
  deliveryType: string;
  deliveryTime: string;
  selectedWeek: number;
  selectedMealPlanName: string;
  selectedMealPlan: any | object | null;
}

export default function calculateOrderLineItems(
  data: calculateOrderLineItemsProps
) {
  let deliveryFeePossible = false,
    deliveryFeeOff = true,
    tax = 0,
    total = 0,
    extrasTotal = getExtrasTotalOnWholeOrder(data.lineItems),
    deliveryFee = 0,
    pricePerMeal = 0,
    mealPlanSelected = false;

  if (data.deliveryType === "delivery") {
    deliveryFeePossible = true;
  }

  if (
    data.selectedMealPlanName !== "a-la-carte" &&
    data.selectedMealPlan !== null
  ) {
    mealPlanSelected = true;
    pricePerMeal = data.selectedMealPlan.pricePerMeal;
  }

  let mealSubTotal = data.lineItems
    .filter((e: any) => e.type === "Meals")
    .reduce(
      (acc: any, curr: any) =>
        (acc +=
          curr.quantity *
          currency(mealPlanSelected ? pricePerMeal : curr.price).value),
      0
    );

  let mealSubTotalNonSavings = data.lineItems
    .filter((e: any) => e.type === "Meals")
    .reduce(
      (acc: any, curr: any) =>
        (acc += curr.quantity * currency(curr.price).value),
      0
    );

  let grocerySubTotal = data.lineItems
    .filter((e: any) => e.type === "Grocery")
    .reduce(
      (acc: any, curr: any) =>
        (acc += curr.quantity * currency(curr.price).value),
      0
    );

  let nonTaxableItemTotal = data.lineItems.reduce((acc: any, curr: any) => {
    // //console.log(curr);
    if (curr.taxExempt) {
      return (acc += curr.quantity * currency(curr.price).value);
    }

    return (acc += 0);
  }, 0);

  // //console.log(nonTaxableItemTotal);

  if (deliveryFeePossible) {
    deliveryFee = calculateDeliveryFee(
      data.lineItems,
      data.selectedWeek,
      data.deliveryTime,
      data.selectedMealPlanName,
      data.selectedMealPlan
    );

    tax += currency(grocerySubTotal)
      .add(mealSubTotal)
      .add(extrasTotal)
      .subtract(nonTaxableItemTotal)
      .add(deliveryFee)
      .multiply(0.13).value;

    total += currency(grocerySubTotal)
      .add(mealSubTotal)
      .add(extrasTotal)
      .add(tax)
      .add(deliveryFee).value;

    deliveryFeeOff = false;
  } else {
    tax += currency(grocerySubTotal)
      .add(mealSubTotal)
      .add(extrasTotal)
      .subtract(nonTaxableItemTotal)
      .multiply(0.13).value;

    total += currency(grocerySubTotal)
      .add(mealSubTotal)
      .add(extrasTotal)
      .add(tax).value;

    deliveryFeePossible = false;
    deliveryFeeOff = true;
  }

  // ADD TAXABLE PRODUCT LOGIC HERE TO SEPARATE TAX EXEMPT ONES

  // //console.log({
  //   subTotalAcutal: currency(mealSubTotalNonSavings)
  //     .add(grocerySubTotal)
  //     .add(extrasTotal).value,
  //   subTotal: currency(grocerySubTotal).add(mealSubTotal).add(extrasTotal)
  //     .value,
  //   extras: extrasTotal,
  //   savings: currency(mealSubTotalNonSavings).subtract(mealSubTotal).value,
  //   total,
  //   displayDeliveryFee: deliveryFeePossible && !deliveryFeeOff,
  //   deliveryFeeOff,
  //   deliveryFee,
  //   tax,
  // });

  // //console.log(extrasTotal);

  return {
    extras: extrasTotal,
    subTotalAcutal: currency(mealSubTotalNonSavings)
      .add(grocerySubTotal)
      .add(extrasTotal).value,
    subTotal: currency(grocerySubTotal).add(mealSubTotal).add(extrasTotal)
      .value,
    savings: currency(mealSubTotalNonSavings).subtract(mealSubTotal).value,
    total,
    displayDeliveryFee: deliveryFeePossible && !deliveryFeeOff,
    deliveryFeeOff,
    deliveryFee,
    tax,
  };
}
