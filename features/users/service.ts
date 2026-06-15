import type { UserRole } from "@/types/app";

export type UserProfileDraft = {
  userId: string;
  role: UserRole;
  fullName: string;
  phone?: string;
  city?: string;
};

export function normalizeUserProfile(input: UserProfileDraft) {
  return {
    user_id: input.userId,
    role: input.role,
    full_name: input.fullName.trim(),
    phone: input.phone?.trim() ?? null,
    city: input.city?.trim() ?? null
  };
}
