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
  "PaySplit is being built to collect installments into a regulated stored balance and pay renewals with PaySplit-managed virtual cards. MVP money movement stays gated until the wallet and issuing partner stack is ready.";

export const PRODUCT_COPY = {
  shortDescription:
    "PaySplit turns annual subscription renewals into predictable installments.",
  longDescription:
    "PaySplit helps professionals and small teams turn annual software subscription renewals into weekly, monthly, or quarterly installments that can fund a regulated renewal balance before the bill is due.",
  plannedReserveLabel: "Renewal balance",
  trackedBalanceLabel: "Saved toward renewal",
};
