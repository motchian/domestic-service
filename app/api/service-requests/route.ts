import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { serviceRequestSchema } from "@/lib/validations/service-request";
import { mockServiceRequests } from "@/features/service-requests/mock-data";

export async function GET() {
  try {
    const auth = await requireRole(["admin", "client"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockServiceRequests);

    const { data, error } = await auth.supabase
      .from("service_requests")
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
    const payload = serviceRequestSchema.parse(await request.json());
    const auth = await requireRole(["client", "admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id: "demo-request", status: "submitted", ...payload }, 201);

    const { data: client } = await auth.supabase
      .from("clients")
      .select("id")
      .eq("user_id", auth.user.id)
      .single();

    if (!client) throw new Error("Client profile missing");

    const { data, error } = await auth.supabase
      .from("service_requests")
      .insert({
        client_id: client.id,
        service_type: payload.serviceType,
        city: payload.city,
        neighborhood: payload.neighborhood,
        budget_min: payload.budgetMin,
        budget_max: payload.budgetMax,
        urgency: payload.urgency,
        housing_possible: payload.housingPossible,
        schedule: payload.schedule,
        status: "submitted",
        metadata: {
          required_skills: payload.requiredSkills,
          requirements: payload.requirements
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
