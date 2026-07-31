import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { backupJobSchema } from "@/lib/infrastructureHardening";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/infra/backup", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, backupJobSchema);
  if (error || !data) return fail("Invalid backup job payload", 422, error);

  return ok({
    message: "Backup job accepted. Persist to BackupJob table.",
    job: data,
  });
}

export async function GET() {
  await recordApiRequest({ endpoint: "/api/infra/backup", method: "GET", status: "REQUEST_RECEIVED" });
  return ok({ jobs: [], message: "Backup jobs implementation module." });
}
