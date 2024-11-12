export function isNumber(value: string): boolean {
  const regex = /^[+-]?\d+(\.\d+)?$/;
  return regex.test(value);
}
