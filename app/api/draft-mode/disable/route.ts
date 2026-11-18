import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  (await draftMode()).disable();

  const requestUrl = new URL(request.url);
  const redirect = requestUrl.searchParams.get("redirect");
  const destination = new URL(redirect ?? "/", requestUrl);
  const isInternalPath = redirect?.startsWith("/") && destination.origin === requestUrl.origin;

  return NextResponse.redirect(isInternalPath ? destination : new URL("/", requestUrl));
}
