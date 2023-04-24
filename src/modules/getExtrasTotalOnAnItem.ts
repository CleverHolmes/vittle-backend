import currency from 'currency.js';

export default function (item: { selectedExtras: Array<object> }) {
  if (!item?.selectedExtras) {
    return 0;
  }

  if (item.selectedExtras.length > 0) {
    return item.selectedExtras.reduce((acc: number, current: any) => {
      return acc + currency(current.price).value;
    }, 0);
  }
}
