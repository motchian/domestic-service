export type UserRole = "admin" | "candidate" | "client" | "trainer" | "social_agent";
export type CandidateStatus = "draft" | "pending_review" | "verified" | "rejected" | "suspended";
export type RequestStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "matched"
  | "assigned"
  | "completed"
  | "cancelled";
export type AssignmentStatus = "pending" | "accepted" | "rejected" | "active" | "completed" | "cancelled";
export type DocumentStatus = "pending" | "approved" | "rejected";
export type TrainingStatus = "not_started" | "in_progress" | "completed";
export type MatchStatus = "recommended" | "shortlisted" | "proposed" | "accepted" | "rejected";

export type CandidateSummary = {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  skills: string[];
  status: CandidateStatus;
  trainingStatus: TrainingStatus;
  yearsExperience: number;
  availability: string[];
  reviewRating: number;
  verifiedDocuments: number;
  expectedSalary: number;
};

export type ClientSummary = {
  id: string;
  name: string;
  type: "family" | "company";
  city: string;
  activeRequests: number;
  createdAt: string;
};

export type ServiceRequestSummary = {
  id: string;
  clientId: string;
  clientName: string;
  serviceType: string;
  city: string;
  neighborhood: string;
  budget: number;
  frequency: string;
  urgency: "low" | "medium" | "high";
  status: RequestStatus;
  housingPossible: boolean;
  requiredSkills: string[];
  schedule: string[];
  createdAt: string;
};

export type MatchRecommendation = {
  candidateId: string;
  name: string;
  city: string;
  skills: string[];
  verificationStatus: CandidateStatus;
  trainingStatus: TrainingStatus;
  score: number;
  reasons: string[];
};

export type DashboardStat = {
  label: string;
  value: string;
  change: string;
};
