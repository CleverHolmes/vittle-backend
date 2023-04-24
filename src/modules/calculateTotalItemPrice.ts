import currency from "currency.js";

export default function (
  item: any,
  discountPrice: number | undefined = undefined
) {
  let basePrice = item.quantity * (discountPrice ? discountPrice : item.price);
  let extrasTotal = 0;

  if (item?.selectedExtras) {
    extrasTotal = item.selectedExtras.reduce(
      (acc: number, curr: any) => acc + curr.quantity * curr.price,
      0
    );

    extrasTotal *= item.quantity;
  }

  //console.log(basePrice, "base price");

  //console.log(extrasTotal, "extras total");

  return basePrice + extrasTotal;
}
