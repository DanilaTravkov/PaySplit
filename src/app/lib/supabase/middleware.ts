import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { PRIVATE_APP_ROUTES } from "../constants";
import type { Database } from "./database.types";
import { getSupabaseConfig } from "./config";

function isPrivatePath(pathname: string) {
  return PRIVATE_APP_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });
  const { url, publishableKey } = getSupabaseConfig();

  const supabase = createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isPrivatePath(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.clone();
    const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;

    redirectUrl.pathname = "/login";
    redirectUrl.search = "";
    redirectUrl.searchParams.set("next", next);

    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
