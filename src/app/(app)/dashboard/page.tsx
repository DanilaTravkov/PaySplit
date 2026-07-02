import { redirect } from "next/navigation";
import { DashboardPage, type DashboardStats, type DashboardSubscription } from "../../pages/DashboardPage";
import { DEFAULT_CURRENCY } from "../../lib/constants";
import { fromMinorUnits } from "../../lib/money";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import type { Database } from "../../lib/supabase/database.types";
import type { Currency, InstallmentFrequency, SubscriptionStatus } from "../../lib/types";

type SubscriptionRow = Database["public"]["Tables"]["subscriptions"]["Row"];
type FundingPlanRow = Database["public"]["Tables"]["funding_plans"]["Row"];

function getDisplayName(user: { email?: string; user_metadata: Record<string, unknown> }) {
  const fullName = user.user_metadata.full_name;

  if (typeof fullName === "string" && fullName.trim()) {
    return fullName.trim();
  }

  return user.email ?? "there";
}

function getUiStatus(plan: FundingPlanRow | undefined): SubscriptionStatus {
  if (plan?.status === "behind") return "behind";
  if (plan?.status === "ready") return "funded";

  return "on_track";
}

function getMonthlyEquivalentMinor(plan: FundingPlanRow) {
  switch (plan.frequency) {
    case "weekly":
      return Math.round((plan.installment_amount_minor * 52) / 12);
    case "quarterly":
      return Math.round(plan.installment_amount_minor / 3);
    case "monthly":
    default:
      return plan.installment_amount_minor;
  }
}

function toDashboardSubscription(
  subscription: SubscriptionRow,
  fundingPlan: FundingPlanRow | undefined
): DashboardSubscription {
  const currency = subscription.currency as Currency;

  return {
    id: subscription.id,
    serviceName: subscription.service_name,
    annualPrice: fromMinorUnits(subscription.renewal_amount_minor, currency),
    currency,
    billingDate: subscription.renewal_date,
    frequency: (fundingPlan?.frequency ?? "monthly") as InstallmentFrequency,
    installmentAmount: fromMinorUnits(fundingPlan?.installment_amount_minor ?? 0, currency),
    savedAmount: fromMinorUnits(fundingPlan?.tracked_balance_minor ?? 0, currency),
    paymentMethod: "card",
    status: getUiStatus(fundingPlan),
  };
}

function buildDashboardStats(
  subscriptions: SubscriptionRow[],
  fundingPlans: FundingPlanRow[]
): DashboardStats {
  const activeSubscriptions = subscriptions.filter((subscription) => subscription.status === "active");
  const currency = (activeSubscriptions[0]?.currency ?? fundingPlans[0]?.currency ?? DEFAULT_CURRENCY) as Currency;
  const activeSubscriptionIds = new Set(activeSubscriptions.map((subscription) => subscription.id));
  const activeFundingPlans = fundingPlans.filter(
    (plan) =>
      activeSubscriptionIds.has(plan.subscription_id) &&
      plan.status !== "cancelled" &&
      plan.status !== "paused"
  );

  return {
    activeSubscriptions: activeSubscriptions.length,
    totalSaved:
      activeFundingPlans.length > 0
        ? fromMinorUnits(
            activeFundingPlans.reduce((total, plan) => total + plan.tracked_balance_minor, 0),
            currency
          )
        : undefined,
    upcomingAnnualPayments:
      activeSubscriptions.length > 0
        ? fromMinorUnits(
            activeSubscriptions.reduce((total, subscription) => total + subscription.renewal_amount_minor, 0),
            currency
          )
        : undefined,
    monthlyCommitment:
      activeFundingPlans.length > 0
        ? fromMinorUnits(
            activeFundingPlans.reduce((total, plan) => total + getMonthlyEquivalentMinor(plan), 0),
            currency
          )
        : undefined,
    currency,
  };
}

export default async function DashboardRoute() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: subscriptions, error: subscriptionsError }, { data: fundingPlans, error: fundingPlansError }] =
    await Promise.all([
      supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .order("renewal_date", { ascending: true }),
      supabase
        .from("funding_plans")
        .select("*")
        .eq("user_id", user.id),
    ]);

  if (subscriptionsError) {
    throw subscriptionsError;
  }

  if (fundingPlansError) {
    throw fundingPlansError;
  }

  const fundingPlanBySubscriptionId = new Map(
    (fundingPlans ?? []).map((plan) => [plan.subscription_id, plan])
  );
  const activeSubscriptions = (subscriptions ?? []).filter((subscription) => subscription.status === "active");

  return (
    <DashboardPage
      displayName={getDisplayName(user)}
      subscriptions={activeSubscriptions.map((subscription) =>
        toDashboardSubscription(subscription, fundingPlanBySubscriptionId.get(subscription.id))
      )}
      stats={buildDashboardStats(subscriptions ?? [], fundingPlans ?? [])}
    />
  );
}
