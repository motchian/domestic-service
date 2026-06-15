import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { trainingSchema } from "@/lib/validations/admin";
import { mockTrainings } from "@/features/trainings/mock-data";

export async function GET() {
  try {
    const auth = await requireRole(["admin", "trainer", "candidate"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockTrainings);

    const { data, error } = await auth.supabase.from("trainings").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return apiSuccess(data);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = trainingSchema.parse(await request.json());
    const auth = await requireRole(["admin", "trainer"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id: "demo-training", ...payload }, 201);

    const { data, error } = await auth.supabase
      .from("trainings")
      .insert({ title: payload.title, description: payload.description ?? null, status: "active" })
      .select()
      .single();

    if (error) throw error;
    return apiSuccess(data, 201);
  } catch (error) {
    return apiError(error);
  }
}
