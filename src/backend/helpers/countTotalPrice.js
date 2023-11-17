export function countTotalPrice(arr) {
  return arr.reduce((acc, { value, price }) => acc + value * price, 0);
}
