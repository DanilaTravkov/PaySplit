import type { Currency } from "./types";

export const APP_NAME = "SplitSub";
export const APP_LEGAL_NAME = "SplitSub";
export const DEFAULT_CURRENCY: Currency = "EUR";
export const DEFAULT_LOCALE = "en-US";
export const PRIMARY_MARKET = "EU/EEA";
export const MVP_ACCESS_COUNT = 127;

export const PUBLIC_ROUTES = ["/"] as const;
export const PRIVATE_APP_ROUTES = [
  "/dashboard",
  "/subscriptions",
  "/payment-methods",
  "/settings",
] as const;

export const NON_CUSTODIAL_DISCLOSURE =
  "SplitSub tracks planned reserves and renewal readiness only. It does not hold, reserve, or store user funds.";

export const PRODUCT_COPY = {
  shortDescription:
    "SplitSub turns annual subscription renewals into predictable tracked plans.",
  longDescription:
    "SplitSub helps professionals and small teams turn annual software subscription renewals into predictable weekly, monthly, or quarterly tracked plans.",
  plannedReserveLabel: "Planned reserve",
  trackedBalanceLabel: "Tracked balance",
};
