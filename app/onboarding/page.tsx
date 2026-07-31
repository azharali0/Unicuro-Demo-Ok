import { redirect } from "next/navigation";
import { requireRole } from "@/lib/session";
import { getOnboardingState } from "@/lib/onboardingRuntimeEngine";

export default async function Page() {
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const state = await getOnboardingState(user.id);
  redirect(state.completed ? "/student" : state.nextRoute);
}
