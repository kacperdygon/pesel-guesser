export function increaseProportionally(array: Array<number>, targetSum: number): Array<number> {
  const copy = [...array];
  const currentSum = copy.reduce((acc, val) => acc + val, 0);

  const scale = currentSum < targetSum ? targetSum / currentSum : 1;

  for (let i = 0; i < copy.length; i++) {
    copy[i] = copy[i] * scale;
  }

  return copy;
}
