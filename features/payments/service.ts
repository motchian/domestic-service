export type PaymentDraft = {
  assignmentId?: string;
  clientId?: string;
  amount: number;
};

export function buildPendingPayment(input: PaymentDraft) {
  return {
    assignment_id: input.assignmentId ?? null,
    client_id: input.clientId ?? null,
    amount: input.amount,
    status: "pending",
    provider_reference: null
  };
}
