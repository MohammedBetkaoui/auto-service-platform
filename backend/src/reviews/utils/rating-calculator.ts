export function calculateAverageRating(total: number, count: number): number {
  if (count === 0) return 0;
  return Number((total / count).toFixed(2));
}
