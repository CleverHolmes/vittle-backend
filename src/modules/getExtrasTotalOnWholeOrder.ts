export default function (cartItems: Array<object>) {
  // //console.log(cartItems.filter((e: any) => e.hasOwnProperty('selectedExtras')));

  if (cartItems.findIndex((e: any) => e.selectedExtras?.length !== 0) == -1) {
    return 0;
  }

  return cartItems
    .filter((e: any) => e.hasOwnProperty("selectedExtras"))
    .reduce((acc: number, curr: any) => {
      let extrasTotal = curr.selectedExtras.reduce(
        (acc2: number, curr2: any) => {
          return acc2 + curr2.price * curr2.quantity * curr.quantity;
        },
        0
      );

      return extrasTotal + acc;
    }, 0);
}
