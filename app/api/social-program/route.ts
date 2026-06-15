import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { socialProgramSchema } from "@/lib/validations/admin";
import { mockSocialApplications } from "@/features/social-program/mock-data";

export async function GET() {
  try {
    const auth = await requireRole(["admin", "social_agent"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockSocialApplications);

    const { data, error } = await auth.supabase
      .from("social_program_applications")
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
    const payload = socialProgramSchema.parse(await request.json());
    const auth = await requireRole(["candidate", "client", "social_agent", "admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id: "demo-social", status: "submitted", ...payload }, 201);

    const { data, error } = await auth.supabase
      .from("social_program_applications")
      .insert({
        applicant_user_id: auth.user.id,
        full_name: payload.fullName,
        city: payload.city,
        priority_level: payload.priorityLevel,
        status: "submitted",
        metadata: {
          phone: payload.phone,
          situation: payload.situation
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
