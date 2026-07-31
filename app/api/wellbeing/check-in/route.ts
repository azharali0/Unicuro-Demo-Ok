import { recordApiRequest } from "@/lib/apiDatabase";
import { ok, fail, parseJson } from "@/lib/api";
import { burnoutRiskScore, moodCheckInSchema, wellbeingPriority } from "@/lib/wellbeing";

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/wellbeing/check-in", method: "POST", status: "REQUEST_RECEIVED" });
  const { data, error } = await parseJson(request, moodCheckInSchema);
  if (error || !data) return fail("Invalid wellbeing check-in", 422, error);

  const score = burnoutRiskScore({
    stressLevel: data.stressLevel,
    sleepHours: data.sleepHours,
    deadlineCount: 2,
  });

  return ok({
    message: "Mood check-in accepted. Connect to MoodCheckIn and BurnoutSignal tables.",
    riskScore: score,
    priority: wellbeingPriority(score),
  });
}
