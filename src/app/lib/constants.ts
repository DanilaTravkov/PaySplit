import type { Currency } from "./types";

export const APP_NAME = "PaySplit";
export const APP_LEGAL_NAME = "PaySplit";
export const DEFAULT_CURRENCY: Currency = "EUR";
export const DEFAULT_LOCALE = "en-US";
export const PRIMARY_MARKET = "EU/EEA";
export const MVP_ACCESS_COUNT = 0;

export const PUBLIC_ROUTES = ["/"] as const;
export const PRIVATE_APP_ROUTES = [
  "/dashboard",
  "/subscriptions",
  "/payment-methods",
  "/settings",
] as const;

export const NON_CUSTODIAL_DISCLOSURE =
  "PaySplit tracks planned reserves and renewal readiness only. It does not hold, reserve, or store user funds.";

export const PRODUCT_COPY = {
  shortDescription:
    "PaySplit turns annual subscription renewals into predictable tracked plans.",
  longDescription:
    "PaySplit helps professionals and small teams turn annual software subscription renewals into predictable weekly, monthly, or quarterly tracked plans.",
  plannedReserveLabel: "Planned reserve",
  trackedBalanceLabel: "Tracked balance",
};
