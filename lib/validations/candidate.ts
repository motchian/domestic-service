import { z } from "zod";

export const candidateOnboardingSchema = z.object({
  fullName: z.string().min(2, "Nom complet requis"),
  phone: z.string().min(6, "Téléphone requis"),
  city: z.string().min(2, "Ville requise"),
  neighborhood: z.string().min(2, "Quartier requis"),
  skills: z.array(z.string()).min(1, "Choisissez au moins une compétence"),
  yearsExperience: z.number().min(0).max(40),
  availability: z.array(z.string()).min(1, "Choisissez au moins une disponibilité"),
  documents: z.array(z.string()),
  expectedSalary: z.number().min(0),
  bio: z.string().min(20, "Décrivez votre expérience en quelques lignes")
});

export const candidateUpdateSchema = candidateOnboardingSchema.partial().extend({
  status: z.enum(["draft", "pending_review", "verified", "rejected", "suspended"]).optional()
});

export type CandidateOnboardingInput = z.infer<typeof candidateOnboardingSchema>;
