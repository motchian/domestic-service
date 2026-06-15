import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { candidateUpdateSchema } from "@/lib/validations/candidate";
import { mockCandidates } from "@/features/candidates/mock-data";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const auth = await requireRole(["admin", "candidate"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockCandidates.find((candidate) => candidate.id === id) ?? null);

    const { data, error } = await auth.supabase.from("candidates").select("*").eq("id", id).single();
    if (error) throw error;
    return apiSuccess(data);
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const payload = candidateUpdateSchema.parse(await request.json());
    const auth = await requireRole(["admin", "candidate"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id, ...payload });

    const { data, error } = await auth.supabase
      .from("candidates")
      .update({
        status: payload.status,
        city: payload.city,
        neighborhood: payload.neighborhood,
        years_experience: payload.yearsExperience,
        expected_salary: payload.expectedSalary,
        bio: payload.bio,
        metadata: payload
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return apiSuccess(data);
  } catch (error) {
    return apiError(error);
  }
}
