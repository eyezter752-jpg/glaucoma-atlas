export function getMarkerRadius(count: number): number {
  if (count >= 20) return 13;
  if (count >= 10) return 10;
  if (count >= 5) return 8;
  if (count >= 3) return 6;
  if (count >= 2) return 5;
  return 4;
}

export function shouldShowLabel(count: number): boolean {
  return count >= 3;
}
