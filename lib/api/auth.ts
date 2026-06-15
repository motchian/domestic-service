import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/app";

export async function requireRole(allowedRoles: UserRole[]) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: true as const,
      demo: true as const,
      supabase: null,
      user: null,
      profile: null
    };
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      ok: false as const,
      response: NextResponse.json({ data: null, error: { message: "Unauthorized" } }, { status: 401 })
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("users_profiles")
    .select("id, user_id, role, full_name")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile || !allowedRoles.includes(profile.role)) {
    return {
      ok: false as const,
      response: NextResponse.json({ data: null, error: { message: "Forbidden" } }, { status: 403 })
    };
  }

  return {
    ok: true as const,
    demo: false as const,
    supabase,
    user,
    profile
  };
}
