import "server-only";

import { createSupabaseAdminClient } from "./supabase/admin";

export async function getMvpSignupCount() {
  const supabase = createSupabaseAdminClient();
  const { count, error } = await supabase
    .from("mvp_signups")
    .select("id", { count: "exact", head: true })
    .neq("status", "unsubscribed");

  if (error) {
    throw error;
  }

  return count ?? 0;
}
