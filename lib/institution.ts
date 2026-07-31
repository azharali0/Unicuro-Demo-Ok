import { z } from "zod";

export const universityPartnerSchema = z.object({
  university: z.string().min(2),
  country: z.string().min(2),
  contact: z.string().email(),
  licenseType: z.enum(["Pilot", "Department", "Campus", "Enterprise"]),
  seats: z.number().min(1),
});

export function licenseUtilisation(usedSeats: number, seats: number) {
  if (!seats) return 0;
  return Math.round((usedSeats / seats) * 100);
}

export function licenseHealth(utilisation: number) {
  if (utilisation >= 65) return "Healthy";
  if (utilisation >= 35) return "Watch";
  return "At Risk";
}
