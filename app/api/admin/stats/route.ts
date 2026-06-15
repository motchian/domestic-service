import { apiError, apiSuccess } from "@/lib/api/response";
import { requireRole } from "@/lib/api/auth";

export async function GET() {
  try {
    const auth = await requireRole(["admin"]);
    if (!auth.ok) return auth.response;
    if (auth.demo) {
      return apiSuccess({
        totalCandidates: 90,
        verifiedCandidates: 48,
        pendingRequests: 17,
        activeAssignments: 22,
        matchingRate: 73,
        revenuePlaceholder: 2400000
      });
    }

    const [candidates, verified, requests, assignments] = await Promise.all([
      auth.supabase.from("candidates").select("id", { count: "exact", head: true }),
      auth.supabase.from("candidates").select("id", { count: "exact", head: true }).eq("status", "verified"),
      auth.supabase.from("service_requests").select("id", { count: "exact", head: true }).in("status", ["submitted", "under_review"]),
      auth.supabase.from("assignments").select("id", { count: "exact", head: true }).eq("status", "active")
    ]);

    return apiSuccess({
      totalCandidates: candidates.count ?? 0,
      verifiedCandidates: verified.count ?? 0,
      pendingRequests: requests.count ?? 0,
      activeAssignments: assignments.count ?? 0,
      matchingRate: 73,
      revenuePlaceholder: 0
    });
  } catch (error) {
    return apiError(error);
  }
}
