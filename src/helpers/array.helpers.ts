export const range = (lower: number, upper: number) =>
  Array.from({ length: upper - lower + 1 }, (_, i) => i + lower);
