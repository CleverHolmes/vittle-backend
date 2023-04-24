export default function (
  extraId: string,
  cartItems: Array<object>,
  itemIdToSearchExtraOn: string
) {
  if (cartItems.findIndex((e: any) => e.id === itemIdToSearchExtraOn) == -1) {
    return false;
  }

  const cartItemToSearchExtraOn: any = cartItems.find(
    (e: any) => e.id === itemIdToSearchExtraOn
  );

  if (cartItemToSearchExtraOn.length === 0) {
    return false;
  }

  if (cartItemToSearchExtraOn.selectedExtras.length == 0) {
    return false;
  }

  if (
    cartItemToSearchExtraOn.selectedExtras.findIndex(
      (e: any) => e._id === extraId
    ) == -1
  ) {
    return false;
  }

  return true;
}
