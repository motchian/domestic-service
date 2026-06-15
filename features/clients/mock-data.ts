import type { ClientSummary } from "@/types/app";

export const mockClients: ClientSummary[] = [
  {
    id: "client-001",
    name: "Famille Kouadio",
    type: "family",
    city: "Abidjan",
    activeRequests: 2,
    createdAt: "2026-05-04"
  },
  {
    id: "client-002",
    name: "Résidence Baobab",
    type: "company",
    city: "Dakar",
    activeRequests: 1,
    createdAt: "2026-05-12"
  },
  {
    id: "client-003",
    name: "Famille Mensah",
    type: "family",
    city: "Cotonou",
    activeRequests: 2,
    createdAt: "2026-05-20"
  }
];
