import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { candidateOnboardingSchema } from "@/lib/validations/candidate";
import { mockCandidates } from "@/features/candidates/mock-data";

export async function GET() {
  try {
    const auth = await requireRole(["admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockCandidates);

    const { data, error } = await auth.supabase
      .from("candidates")
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
    const payload = candidateOnboardingSchema.parse(await request.json());
    const auth = await requireRole(["candidate", "admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ ...payload, id: "demo-candidate", status: "pending_review" }, 201);

    const { data, error } = await auth.supabase
      .from("candidates")
      .insert({
        user_id: auth.user.id,
        status: "pending_review",
        city: payload.city,
        neighborhood: payload.neighborhood,
        years_experience: payload.yearsExperience,
        expected_salary: payload.expectedSalary,
        bio: payload.bio,
        metadata: {
          full_name: payload.fullName,
          phone: payload.phone,
          skills: payload.skills,
          availability: payload.availability,
          documents: payload.documents
        }
      })
      .select()
      .single();

    if (error) throw error;
    return apiSuccess(data, 201);
  } catch (error) {
    return apiError(error);
  }
}
