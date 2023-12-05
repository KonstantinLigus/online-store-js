export function countTotalPrice(arr) {
  return arr.reduce((acc, { quantity, price }) => acc + quantity * price, 0);
}
