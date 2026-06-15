import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { assignmentUpdateSchema } from "@/lib/validations/admin";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const payload = assignmentUpdateSchema.parse(await request.json());
    const auth = await requireRole(["admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id, ...payload });

    const { data, error } = await auth.supabase
      .from("assignments")
      .update({
        status: payload.status,
        start_date: payload.startDate,
        end_date: payload.endDate
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
