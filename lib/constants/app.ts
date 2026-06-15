import type { CandidateStatus, RequestStatus, UserRole } from "@/types/app";

export const appName = "HomeCare Hub";

export const serviceTypes = [
  "Aide ménagère",
  "Nounou",
  "Cuisinière",
  "Gouvernante",
  "Agent d'entretien",
  "Assistante à domicile"
] as const;

export const candidateSkills = [
  "Nettoyage résidentiel",
  "Garde d'enfants",
  "Cuisine familiale",
  "Cuisine événementielle",
  "Entretien bureaux",
  "Repassage",
  "Courses",
  "Soins aux personnes âgées",
  "Gestion maison",
  "Hygiène et sécurité"
] as const;

export const cities = ["Abidjan", "Dakar", "Cotonou", "Lomé", "Bamako", "Ouagadougou"] as const;

export const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  candidate: "Candidate",
  client: "Client",
  trainer: "Formateur",
  social_agent: "Agent social"
};

export const candidateStatusLabels: Record<CandidateStatus, string> = {
  draft: "Brouillon",
  pending_review: "En attente",
  verified: "Vérifiée",
  rejected: "Rejetée",
  suspended: "Suspendue"
};

export const requestStatusLabels: Record<RequestStatus, string> = {
  draft: "Brouillon",
  submitted: "Soumise",
  under_review: "Analyse",
  matched: "Matchée",
  assigned: "Affectée",
  completed: "Terminée",
  cancelled: "Annulée"
};
