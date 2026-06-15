import { z } from "zod";

import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";

const notificationSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(2),
  body: z.string().min(2)
});

export async function GET() {
  try {
    const auth = await requireRole(["admin", "candidate", "client", "trainer", "social_agent"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) {
      return apiSuccess([
        { id: "notif-001", title: "Profil reçu", body: "Votre dossier est en cours de vérification.", read_at: null }
      ]);
    }

    const { data, error } = await auth.supabase
      .from("notifications")
      .select("*")
      .eq("user_id", auth.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return apiSuccess(data);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = notificationSchema.parse(await request.json());
    const auth = await requireRole(["admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id: "demo-notification", ...payload }, 201);

    const { data, error } = await auth.supabase
      .from("notifications")
      .insert({
        user_id: payload.userId,
        title: payload.title,
        body: payload.body
      })
      .select()
      .single();

    if (error) throw error;
    return apiSuccess(data, 201);
  } catch (error) {
    return apiError(error);
  }
}
