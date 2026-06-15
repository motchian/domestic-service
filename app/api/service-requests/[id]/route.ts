import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { serviceRequestUpdateSchema } from "@/lib/validations/service-request";
import { mockServiceRequests } from "@/features/service-requests/mock-data";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const auth = await requireRole(["admin", "client"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockServiceRequests.find((item) => item.id === id) ?? null);

    const { data, error } = await auth.supabase.from("service_requests").select("*").eq("id", id).single();
    if (error) throw error;
    return apiSuccess(data);
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const payload = serviceRequestUpdateSchema.parse(await request.json());
    const auth = await requireRole(["admin", "client"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id, ...payload });

    const { data, error } = await auth.supabase
      .from("service_requests")
      .update({
        service_type: payload.serviceType,
        city: payload.city,
        neighborhood: payload.neighborhood,
        budget_min: payload.budgetMin,
        budget_max: payload.budgetMax,
        urgency: payload.urgency,
        housing_possible: payload.housingPossible,
        schedule: payload.schedule,
        status: payload.status,
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
