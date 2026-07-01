import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "./constants";
import { formatMoney, toMinorUnits } from "./money";
import type { Currency } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: Currency = DEFAULT_CURRENCY) {
  return formatMoney(toMinorUnits(amount, currency), currency);
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}
