import type { DocumentStatus } from "@/types/app";

export type CandidateDocumentDraft = {
  candidateId: string;
  documentType: string;
  filePath: string;
};

export function buildCandidateDocument(input: CandidateDocumentDraft, status: DocumentStatus = "pending") {
  return {
    candidate_id: input.candidateId,
    document_type: input.documentType,
    file_path: input.filePath,
    status
  };
}
