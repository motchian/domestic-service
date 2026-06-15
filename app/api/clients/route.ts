import { z } from "zod";

import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";
import { mockClients } from "@/features/clients/mock-data";

const clientSchema = z.object({
  clientType: z.enum(["family", "company"]).default("family"),
  city: z.string().min(2),
  organizationName: z.string().optional()
});

export async function GET() {
  try {
    const auth = await requireRole(["admin", "client"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess(mockClients);

    const query = auth.profile.role === "admin"
      ? auth.supabase.from("clients").select("*").order("created_at", { ascending: false })
      : auth.supabase.from("clients").select("*").eq("user_id", auth.user.id);

    const { data, error } = await query;
    if (error) throw error;
    return apiSuccess(data);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = clientSchema.parse(await request.json());
    const auth = await requireRole(["client", "admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) return apiSuccess({ id: "demo-client", ...payload }, 201);

    const { data, error } = await auth.supabase
      .from("clients")
      .insert({
        user_id: auth.user.id,
        client_type: payload.clientType,
        city: payload.city,
        organization_name: payload.organizationName ?? null
      })
      .select()
      .single();

    if (error) throw error;
    return apiSuccess(data, 201);
  } catch (error) {
    return apiError(error);
  }
}
