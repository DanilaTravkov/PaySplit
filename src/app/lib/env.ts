type EnvVar = {
  key: string;
  requiredInProduction: boolean;
  public: boolean;
};

export const envSchema = [
  { key: "NEXT_PUBLIC_SITE_URL", requiredInProduction: true, public: true },
  { key: "NEXT_PUBLIC_SUPABASE_URL", requiredInProduction: true, public: true },
  { key: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", requiredInProduction: true, public: true },
  { key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", requiredInProduction: true, public: true },
  { key: "SUPABASE_SECRET_KEY", requiredInProduction: true, public: false },
  { key: "SUPABASE_JWT_KEY_ID", requiredInProduction: true, public: false },
  { key: "SUPABASE_JWKS_URL", requiredInProduction: true, public: false },
  { key: "STRIPE_SECRET_KEY", requiredInProduction: true, public: false },
  { key: "STRIPE_WEBHOOK_SECRET", requiredInProduction: true, public: false },
] as const satisfies readonly EnvVar[];

type EnvKey = (typeof envSchema)[number]["key"];

export function getEnv(key: EnvKey) {
  return process.env[key];
}

export function requireEnv(key: EnvKey) {
  const value = getEnv(key);

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function validateEnv(options: { strict?: boolean } = {}) {
  const missing = envSchema
    .filter((entry) => options.strict && entry.requiredInProduction && !process.env[entry.key])
    .map((entry) => entry.key);

  if (missing.length > 0) {
    throw new Error(`Missing required production environment variables: ${missing.join(", ")}`);
  }

  return {
    missing,
    publicKeys: envSchema.filter((entry) => entry.public).map((entry) => entry.key),
    serverKeys: envSchema.filter((entry) => !entry.public).map((entry) => entry.key),
  };
}
