import { requireEnv } from "../env";

export function getSupabaseConfig() {
  return {
    url: requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    publishableKey: requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  };
}

export function getSupabaseAdminConfig() {
  return {
    ...getSupabaseConfig(),
    secretKey: requireEnv("SUPABASE_SECRET_KEY"),
  };
}

export function getSupabaseJwtConfig() {
  return {
    keyId: requireEnv("SUPABASE_JWT_KEY_ID"),
    jwksUrl: requireEnv("SUPABASE_JWKS_URL"),
  };
}
