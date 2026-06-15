import type { CandidateSummary } from "@/types/app";

export const mockCandidates: CandidateSummary[] = [
  {
    id: "cand-001",
    name: "Aïcha Koné",
    city: "Abidjan",
    neighborhood: "Cocody",
    skills: ["Nettoyage résidentiel", "Repassage", "Gestion maison"],
    status: "verified",
    trainingStatus: "completed",
    yearsExperience: 6,
    availability: ["Lundi matin", "Mercredi matin", "Samedi journée"],
    reviewRating: 4.8,
    verifiedDocuments: 4,
    expectedSalary: 150000
  },
  {
    id: "cand-002",
    name: "Mariama Diop",
    city: "Dakar",
    neighborhood: "Mermoz",
    skills: ["Garde d'enfants", "Cuisine familiale", "Courses"],
    status: "pending_review",
    trainingStatus: "in_progress",
    yearsExperience: 4,
    availability: ["Lundi journée", "Mardi journée", "Jeudi journée"],
    reviewRating: 4.5,
    verifiedDocuments: 2,
    expectedSalary: 180000
  },
  {
    id: "cand-003",
    name: "Estelle Mensah",
    city: "Cotonou",
    neighborhood: "Fidjrossè",
    skills: ["Cuisine familiale", "Cuisine événementielle", "Hygiène et sécurité"],
    status: "verified",
    trainingStatus: "completed",
    yearsExperience: 8,
    availability: ["Vendredi journée", "Samedi journée", "Dimanche matin"],
    reviewRating: 4.9,
    verifiedDocuments: 5,
    expectedSalary: 220000
  },
  {
    id: "cand-004",
    name: "Fanta Traoré",
    city: "Bamako",
    neighborhood: "ACI 2000",
    skills: ["Soins aux personnes âgées", "Assistante à domicile", "Courses"],
    status: "draft",
    trainingStatus: "not_started",
    yearsExperience: 2,
    availability: ["Mardi matin", "Jeudi matin"],
    reviewRating: 4.1,
    verifiedDocuments: 1,
    expectedSalary: 130000
  },
  {
    id: "cand-005",
    name: "Nadine Teko",
    city: "Lomé",
    neighborhood: "Agoè",
    skills: ["Entretien bureaux", "Nettoyage résidentiel", "Hygiène et sécurité"],
    status: "verified",
    trainingStatus: "in_progress",
    yearsExperience: 5,
    availability: ["Lundi soir", "Mercredi soir", "Vendredi soir"],
    reviewRating: 4.6,
    verifiedDocuments: 3,
    expectedSalary: 160000
  }
];
