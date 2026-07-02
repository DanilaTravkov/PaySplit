export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type CurrencyCode = "EUR" | "USD" | "GBP";
type PaymentMethodType = "card" | "bank_transfer" | "paypal" | "crypto";
type InstallmentFrequency = "weekly" | "monthly" | "quarterly";
type SubscriptionStatus = "active" | "paused" | "archived";
type FundingPlanStatus = "on_track" | "behind" | "ready" | "paused" | "cancelled";
type LedgerEntryType = "planned_contribution" | "manual_adjustment" | "renewal_checkpoint" | "missed_checkpoint";
type ReminderEventType = "upcoming_renewal" | "behind_plan" | "payment_method_expiring" | "manual";
type ReminderEventStatus = "pending" | "sent" | "skipped" | "failed";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          default_currency: CurrencyCode;
          locale: string;
          region: string;
          accepted_terms_at: string | null;
          onboarding_completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          default_currency?: CurrencyCode;
          locale?: string;
          region?: string;
          accepted_terms_at?: string | null;
          onboarding_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          default_currency?: CurrencyCode;
          locale?: string;
          region?: string;
          accepted_terms_at?: string | null;
          onboarding_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      payment_methods: {
        Row: {
          id: string;
          user_id: string;
          type: PaymentMethodType;
          stripe_payment_method_id: string | null;
          display_name: string;
          brand: string | null;
          last4: string | null;
          exp_month: number | null;
          exp_year: number | null;
          billing_name: string | null;
          is_default: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type?: PaymentMethodType;
          stripe_payment_method_id?: string | null;
          display_name: string;
          brand?: string | null;
          last4?: string | null;
          exp_month?: number | null;
          exp_year?: number | null;
          billing_name?: string | null;
          is_default?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: PaymentMethodType;
          stripe_payment_method_id?: string | null;
          display_name?: string;
          brand?: string | null;
          last4?: string | null;
          exp_month?: number | null;
          exp_year?: number | null;
          billing_name?: string | null;
          is_default?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          service_name: string;
          service_url: string | null;
          logo_url: string | null;
          renewal_amount_minor: number;
          currency: CurrencyCode;
          renewal_date: string;
          billing_interval_months: number;
          status: SubscriptionStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_name: string;
          service_url?: string | null;
          logo_url?: string | null;
          renewal_amount_minor: number;
          currency?: CurrencyCode;
          renewal_date: string;
          billing_interval_months?: number;
          status?: SubscriptionStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          service_name?: string;
          service_url?: string | null;
          logo_url?: string | null;
          renewal_amount_minor?: number;
          currency?: CurrencyCode;
          renewal_date?: string;
          billing_interval_months?: number;
          status?: SubscriptionStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      funding_plans: {
        Row: {
          id: string;
          user_id: string;
          subscription_id: string;
          payment_method_id: string | null;
          target_amount_minor: number;
          tracked_balance_minor: number;
          currency: CurrencyCode;
          frequency: InstallmentFrequency;
          installment_amount_minor: number;
          starts_on: string;
          target_date: string;
          status: FundingPlanStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subscription_id: string;
          payment_method_id?: string | null;
          target_amount_minor: number;
          tracked_balance_minor?: number;
          currency?: CurrencyCode;
          frequency?: InstallmentFrequency;
          installment_amount_minor: number;
          starts_on?: string;
          target_date: string;
          status?: FundingPlanStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subscription_id?: string;
          payment_method_id?: string | null;
          target_amount_minor?: number;
          tracked_balance_minor?: number;
          currency?: CurrencyCode;
          frequency?: InstallmentFrequency;
          installment_amount_minor?: number;
          starts_on?: string;
          target_date?: string;
          status?: FundingPlanStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ledger_entries: {
        Row: {
          id: string;
          user_id: string;
          funding_plan_id: string;
          subscription_id: string;
          entry_type: LedgerEntryType;
          amount_minor: number;
          currency: CurrencyCode;
          effective_on: string;
          description: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          funding_plan_id: string;
          subscription_id: string;
          entry_type: LedgerEntryType;
          amount_minor: number;
          currency?: CurrencyCode;
          effective_on?: string;
          description?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          funding_plan_id?: string;
          subscription_id?: string;
          entry_type?: LedgerEntryType;
          amount_minor?: number;
          currency?: CurrencyCode;
          effective_on?: string;
          description?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      reminder_events: {
        Row: {
          id: string;
          user_id: string;
          subscription_id: string | null;
          funding_plan_id: string | null;
          event_type: ReminderEventType;
          status: ReminderEventStatus;
          scheduled_for: string;
          sent_at: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subscription_id?: string | null;
          funding_plan_id?: string | null;
          event_type: ReminderEventType;
          status?: ReminderEventStatus;
          scheduled_for: string;
          sent_at?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subscription_id?: string | null;
          funding_plan_id?: string | null;
          event_type?: ReminderEventType;
          status?: ReminderEventStatus;
          scheduled_for?: string;
          sent_at?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      stripe_customers: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          livemode: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id: string;
          livemode?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string;
          livemode?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      stripe_events: {
        Row: {
          stripe_event_id: string;
          event_type: string;
          api_version: string | null;
          livemode: boolean;
          payload: Json;
          processed_at: string | null;
          processing_error: string | null;
          received_at: string;
        };
        Insert: {
          stripe_event_id: string;
          event_type: string;
          api_version?: string | null;
          livemode?: boolean;
          payload: Json;
          processed_at?: string | null;
          processing_error?: string | null;
          received_at?: string;
        };
        Update: {
          stripe_event_id?: string;
          event_type?: string;
          api_version?: string | null;
          livemode?: boolean;
          payload?: Json;
          processed_at?: string | null;
          processing_error?: string | null;
          received_at?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          actor_user_id: string | null;
          action: string;
          entity_table: string | null;
          entity_id: string | null;
          metadata: Json;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          actor_user_id?: string | null;
          action: string;
          entity_table?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          actor_user_id?: string | null;
          action?: string;
          entity_table?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      mvp_signups: {
        Row: {
          id: string;
          email: string;
          status: string;
          user_id: string | null;
          converted_user_id: string | null;
          invited_at: string | null;
          unsubscribed_at: string | null;
          source: string;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          status?: string;
          user_id?: string | null;
          converted_user_id?: string | null;
          invited_at?: string | null;
          unsubscribed_at?: string | null;
          source?: string;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          status?: string;
          user_id?: string | null;
          converted_user_id?: string | null;
          invited_at?: string | null;
          unsubscribed_at?: string | null;
          source?: string;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      currency_code: CurrencyCode;
      payment_method_type: PaymentMethodType;
      installment_frequency: InstallmentFrequency;
      subscription_status: SubscriptionStatus;
      funding_plan_status: FundingPlanStatus;
      ledger_entry_type: LedgerEntryType;
      reminder_event_type: ReminderEventType;
      reminder_event_status: ReminderEventStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
