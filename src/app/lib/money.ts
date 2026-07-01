import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "./constants";
import type { Currency, MoneyMinorUnit } from "./types";

const currencyMinorUnitDigits: Record<Currency, number> = {
  EUR: 2,
  USD: 2,
  GBP: 2,
};

export function getCurrencyMinorUnitDigits(currency: Currency = DEFAULT_CURRENCY) {
  return currencyMinorUnitDigits[currency];
}

export function toMinorUnits(amount: number, currency: Currency = DEFAULT_CURRENCY): MoneyMinorUnit {
  const multiplier = 10 ** getCurrencyMinorUnitDigits(currency);

  return Math.round(amount * multiplier);
}

export function fromMinorUnits(amountMinor: MoneyMinorUnit, currency: Currency = DEFAULT_CURRENCY) {
  const divisor = 10 ** getCurrencyMinorUnitDigits(currency);

  return amountMinor / divisor;
}

export function formatMoney(
  amountMinor: MoneyMinorUnit,
  currency: Currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(fromMinorUnits(amountMinor, currency));
}

export function calculateInstallmentAmountMinor(
  amountMinor: MoneyMinorUnit,
  periods: number
): MoneyMinorUnit {
  if (periods <= 0) return amountMinor;

  return Math.ceil(amountMinor / periods);
}

export function calculateProgressFromMinorUnits(
  currentMinor: MoneyMinorUnit,
  targetMinor: MoneyMinorUnit
) {
  if (targetMinor <= 0) return 0;

  return Math.min(100, Math.max(0, (currentMinor / targetMinor) * 100));
}
