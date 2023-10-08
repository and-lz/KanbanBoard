export function moveItemInArray<T>(
  arr: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  if (
    fromIndex < 0 ||
    fromIndex >= arr.length ||
    toIndex < 0 ||
    toIndex >= arr.length
  ) {
    throw new Error("Invalid indices");
  }

  const itemToMove = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, itemToMove);

  return arr;
}
