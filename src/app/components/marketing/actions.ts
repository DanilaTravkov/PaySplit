"use server";

import { sendMvpWelcomeEmail } from "../../lib/email/resend";
import { getMvpSignupCount } from "../../lib/mvp-signups";
import { createSupabaseAdminClient } from "../../lib/supabase/admin";

type MvpSignupResult = {
  ok: boolean;
  count: number;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasSentWelcomeEmail(metadata: unknown) {
  if (!metadata || Array.isArray(metadata) || typeof metadata !== "object") {
    return false;
  }

  const welcomeEmail = (metadata as { welcome_email?: { status?: string } }).welcome_email;

  return welcomeEmail?.status === "sent";
}

async function sendAndRecordWelcomeEmail(email: string) {
  const supabase = createSupabaseAdminClient();

  try {
    await sendMvpWelcomeEmail(email);
  } catch (sendError) {
    const errorMessage = sendError instanceof Error ? sendError.message : "Unknown email error";

    console.error("Failed to send MVP welcome email", {
      email,
      error: errorMessage,
    });

    await supabase
      .from("mvp_signups")
      .update({
        metadata: {
          welcome_email: {
            status: "failed",
            error: errorMessage,
          },
        },
      })
      .eq("email", email);

    return false;
  }

  await supabase
    .from("mvp_signups")
    .update({
      metadata: {
        welcome_email: {
          status: "sent",
          sent_at: new Date().toISOString(),
        },
      },
    })
    .eq("email", email);

  return true;
}

export async function subscribeToMvpAction(email: string): Promise<MvpSignupResult> {
  const trimmedEmail = email.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return {
      ok: false,
      count: await getMvpSignupCount(),
      message: "Enter a valid email to join the MVP test.",
    };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("mvp_signups").insert({
    email: trimmedEmail,
    source: "landing_page",
    status: "subscribed",
  });

  if (error && error.code !== "23505") {
    return {
      ok: false,
      count: await getMvpSignupCount(),
      message: "Something went wrong. Please try again.",
    };
  }

  const count = await getMvpSignupCount();

  if (error?.code === "23505") {
    const { data: existingSignup } = await supabase
      .from("mvp_signups")
      .select("metadata")
      .eq("email", trimmedEmail)
      .maybeSingle();

    if (!hasSentWelcomeEmail(existingSignup?.metadata)) {
      const sent = await sendAndRecordWelcomeEmail(trimmedEmail);

      return {
        ok: true,
        count,
        message: sent ? "MVP signup saved." : "The confirmation email could not be sent yet.",
      };
    }

    return {
      ok: true,
      count,
      message: "You're already on the MVP tester list.",
    };
  }

  const sent = await sendAndRecordWelcomeEmail(trimmedEmail);
  if (!sent) {
    return {
      ok: true,
      count,
      message: "You're on the MVP list. The confirmation email could not be sent yet.",
    };
  }

  return {
    ok: true,
    count,
    message: "MVP signup saved.",
  };
}
