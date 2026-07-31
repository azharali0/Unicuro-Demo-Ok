export function todayKey(now = new Date()) {
  return now.toISOString().slice(0, 10);
}
export function addDays(days: number, from = new Date()) {
  const copy = new Date(from);
  copy.setDate(copy.getDate() + days);
  return copy;
}
