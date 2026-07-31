export function safeJson(value: unknown) {
  return JSON.parse(JSON.stringify(value));
}
