import { z } from "zod";

export const serviceRequestSchema = z.object({
  serviceType: z.string().min(2, "Type de service requis"),
  city: z.string().min(2, "Ville requise"),
  neighborhood: z.string().min(2, "Quartier requis"),
  schedule: z.array(z.string()).min(1, "Sélectionnez au moins une plage"),
  budgetMin: z.number().min(0),
  budgetMax: z.number().min(0),
  urgency: z.enum(["low", "medium", "high"]),
  housingPossible: z.boolean(),
  requiredSkills: z.array(z.string()),
  requirements: z.string().min(10, "Précisez le besoin")
});

export const serviceRequestUpdateSchema = serviceRequestSchema.partial().extend({
  status: z.enum(["draft", "submitted", "under_review", "matched", "assigned", "completed", "cancelled"]).optional()
});

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
