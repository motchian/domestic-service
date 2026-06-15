import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court")
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(2, "Nom requis"),
  role: z.enum(["candidate", "client"])
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
