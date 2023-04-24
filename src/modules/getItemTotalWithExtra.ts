export default function (item: { selectedExtras: Array<object> }) {
  return item.selectedExtras.length > 0;
}
