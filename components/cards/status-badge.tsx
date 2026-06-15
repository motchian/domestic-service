import { Badge } from "@/components/ui/badge";
import { candidateStatusLabels, requestStatusLabels } from "@/lib/constants/app";
import type { CandidateStatus, RequestStatus, TrainingStatus } from "@/types/app";

type StatusBadgeProps = {
  status: CandidateStatus | RequestStatus | TrainingStatus | string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const label =
    candidateStatusLabels[status as CandidateStatus] ??
    requestStatusLabels[status as RequestStatus] ??
    trainingLabels[status as TrainingStatus] ??
    status;

  const variant =
    status === "verified" || status === "completed" || status === "assigned"
      ? "success"
      : status === "pending_review" || status === "submitted" || status === "in_progress"
        ? "warning"
        : status === "rejected" || status === "cancelled" || status === "suspended"
          ? "danger"
          : "secondary";

  return <Badge variant={variant}>{label}</Badge>;
}

const trainingLabels: Record<TrainingStatus, string> = {
  not_started: "Non démarrée",
  in_progress: "En cours",
  completed: "Formée"
};
