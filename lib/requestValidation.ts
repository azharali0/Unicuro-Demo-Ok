import { z } from "zod";
const jsonObjectSchema = z.record(z.string(), z.unknown());
export async function parseJsonObject(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) throw new Error("UNSUPPORTED_CONTENT_TYPE");
  const text = await request.text();
  if (text.length > 1_000_000) throw new Error("REQUEST_BODY_TOO_LARGE");
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error("INVALID_JSON"); }
  return jsonObjectSchema.parse(value);
}
