import { mockCandidates } from "@/features/candidates/mock-data";
import { mockServiceRequests } from "@/features/service-requests/mock-data";
import type { CandidateSummary, MatchRecommendation, ServiceRequestSummary } from "@/types/app";

export function calculateMatchScore(candidate: CandidateSummary, serviceRequest: ServiceRequestSummary): number {
  let score = 0;

  if (candidate.city === serviceRequest.city) score += 20;

  const skillMatches = candidate.skills.filter((skill) => {
    return skill === serviceRequest.serviceType || serviceRequest.requiredSkills.includes(skill);
  });
  if (skillMatches.length > 0) {
    score += Math.min(25, 12 + skillMatches.length * 7);
  }

  const availabilityMatches = candidate.availability.filter((slot) => serviceRequest.schedule.includes(slot));
  if (availabilityMatches.length > 0) {
    score += Math.min(20, availabilityMatches.length * 8);
  }

  if (candidate.yearsExperience >= 5) score += 10;
  else if (candidate.yearsExperience >= 2) score += 6;

  if (candidate.trainingStatus === "completed") score += 10;
  else if (candidate.trainingStatus === "in_progress") score += 5;

  if (candidate.status === "verified") score += 10;

  score += Math.min(5, Math.round(candidate.reviewRating));

  return Math.min(100, score);
}

function buildReasons(candidate: CandidateSummary, request: ServiceRequestSummary) {
  const reasons: string[] = [];

  if (candidate.city === request.city) reasons.push(`Même ville : ${candidate.city}`);

  const skills = candidate.skills.filter((skill) => skill === request.serviceType || request.requiredSkills.includes(skill));
  if (skills.length) reasons.push(`Compétences alignées : ${skills.join(", ")}`);

  const slots = candidate.availability.filter((slot) => request.schedule.includes(slot));
  if (slots.length) reasons.push(`Disponibilités compatibles : ${slots.join(", ")}`);

  if (candidate.status === "verified") reasons.push("Profil vérifié par l'administration");
  if (candidate.trainingStatus === "completed") reasons.push("Formation interne complétée");
  if (candidate.reviewRating >= 4.5) reasons.push(`Très bonne note : ${candidate.reviewRating}/5`);

  return reasons;
}

export async function recommendCandidatesForRequest(requestId: string): Promise<MatchRecommendation[]> {
  const request = mockServiceRequests.find((item) => item.id === requestId) ?? mockServiceRequests[0];

  return mockCandidates
    .map((candidate) => ({
      candidateId: candidate.id,
      name: candidate.name,
      city: candidate.city,
      skills: candidate.skills,
      verificationStatus: candidate.status,
      trainingStatus: candidate.trainingStatus,
      score: calculateMatchScore(candidate, request),
      reasons: buildReasons(candidate, request)
    }))
    .sort((a, b) => b.score - a.score);
}
