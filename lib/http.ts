export function ok<T extends Record<string, unknown>>(data: T, init?: ResponseInit) {
  return Response.json({ ok: true, ...data }, init);
}

export function fail(error: string, status = 400, details?: unknown) {
  return Response.json({ ok: false, error, details }, { status });
}
