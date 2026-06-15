import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { matchingProposeSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  try {
    const payload = matchingProposeSchema.parse(await request.json());
    const auth = await requireRole(["admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ status: "proposed", ...payload }, 201);

    const { data, error } = await auth.supabase
      .from("matches")
      .insert({
        request_id: payload.requestId,
        candidate_id: payload.candidateId,
        score: 0,
        status: "proposed",
        reasons: payload.message ? [payload.message] : []
      })
      .select()
      .single();

    if (error) throw error;
    return apiSuccess(data, 201);
  } catch (error) {
    return apiError(error);
  }
}
