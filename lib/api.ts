import { NextResponse } from "next/server";
import { z } from "zod";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, details }, { status });
}

export async function parseJson<T>(request: Request, schema: z.ZodSchema<T>) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    if (!result.success) return { data: null, error: result.error.flatten() };
    return { data: result.data, error: null };
  } catch {
    return { data: null, error: "Invalid JSON body" };
  }
}
