export function offsetForRectangle(buttonSize: number): number {
  return (-1 * buttonSize) / 4.4;
}

export function offsetForRounded(buttonSize: number, circleSize: number) {
  const sinIn45 = Math.sin((45 * Math.PI) / 180);
  return ((1 - sinIn45) * circleSize) / 2 - buttonSize / 2;
}
