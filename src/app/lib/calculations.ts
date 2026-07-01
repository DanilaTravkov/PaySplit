import { InstallmentFrequency } from "./types";
import { calculateInstallmentAmountMinor, calculateProgressFromMinorUnits, toMinorUnits } from "./money";

export function calculateInstallmentAmount(
  annualPrice: number,
  frequency: InstallmentFrequency
): number {
  const annualPriceMinor = toMinorUnits(annualPrice);

  switch (frequency) {
    case "weekly":
      return calculateInstallmentAmountMinor(annualPriceMinor, 52) / 100;
    case "monthly":
      return calculateInstallmentAmountMinor(annualPriceMinor, 12) / 100;
    case "quarterly":
      return calculateInstallmentAmountMinor(annualPriceMinor, 4) / 100;
    default:
      return calculateInstallmentAmountMinor(annualPriceMinor, 12) / 100;
  }
}

export function calculateProgress(savedAmount: number, annualPrice: number): number {
  return calculateProgressFromMinorUnits(toMinorUnits(savedAmount), toMinorUnits(annualPrice));
}
