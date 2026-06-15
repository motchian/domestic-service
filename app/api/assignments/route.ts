import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { assignmentSchema } from "@/lib/validations/admin";
import { mockAssignments } from "@/features/assignments/mock-data";

export async function GET() {
  try {
    const auth = await requireRole(["admin", "candidate", "client"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockAssignments);

    const { data, error } = await auth.supabase
      .from("assignments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return apiSuccess(data);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = assignmentSchema.parse(await request.json());
    const auth = await requireRole(["admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id: "demo-assignment", status: "pending", ...payload }, 201);

    const { data, error } = await auth.supabase
      .from("assignments")
      .insert({
        request_id: payload.requestId,
        candidate_id: payload.candidateId,
        client_id: payload.clientId,
        status: "pending",
        start_date: payload.startDate ?? null,
        end_date: payload.endDate ?? null
      })
      .select()
      .single();

    if (error) throw error;
    return apiSuccess(data, 201);
  } catch (error) {
    return apiError(error);
  }
}
