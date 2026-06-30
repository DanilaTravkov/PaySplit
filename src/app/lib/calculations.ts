import { InstallmentFrequency } from "./types";

export function calculateInstallmentAmount(
  annualPrice: number,
  frequency: InstallmentFrequency
): number {
  switch (frequency) {
    case "weekly":
      return annualPrice / 52;
    case "monthly":
      return annualPrice / 12;
    case "quarterly":
      return annualPrice / 4;
    default:
      return annualPrice / 12;
  }
}

export function calculateProgress(savedAmount: number, annualPrice: number): number {
  if (annualPrice <= 0) return 0;
  return Math.min(100, Math.max(0, (savedAmount / annualPrice) * 100));
}
