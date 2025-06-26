export function getStatColor(value: number): string {
  if (value >= 100) return "bg-green-500";
  if (value < 50) return "bg-red-500";
  return "bg-yellow-500";
}
