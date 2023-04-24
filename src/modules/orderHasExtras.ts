export default function (cartItems: Array<object>) {
  return cartItems.findIndex((e: any) => e.selectedExtras.length > 0) >= 0;
}
