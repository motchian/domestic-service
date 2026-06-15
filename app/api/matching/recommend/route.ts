import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { matchingRecommendSchema } from "@/lib/validations/admin";
import { recommendCandidatesForRequest } from "@/features/matching/engine";

export async function POST(request: Request) {
  try {
    const { requestId } = matchingRecommendSchema.parse(await request.json());
    const auth = await requireRole(["admin"]);
    if (!auth.ok) return auth.response;

    const recommendations = await recommendCandidatesForRequest(requestId);
    return apiSuccess(recommendations);
  } catch (error) {
    return apiError(error);
  }
}
