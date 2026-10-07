import { NextResponse, type NextRequest } from "next/server";

const APEX = "https://zunialab.com";

/**
 * One host is indexed. www is the same site, and link.zunialab.com only exists
 * so Apple and Android can read `/.well-known`. Everything else on those hosts
 * goes to the apex, permanently, before a page is rendered.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.replace(/:\d+$/, "").toLowerCase();
  const path = request.nextUrl.pathname;
  const linkAlias = host === "link.zunialab.com" && !path.startsWith("/.well-known");
  if (host !== "www.zunialab.com" && !linkAlias) return NextResponse.next();
  return NextResponse.redirect(new URL(`${path}${request.nextUrl.search}`, APEX), 308);
}
