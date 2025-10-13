import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "hr"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hasCountryPrefix = pathname.split("/")[1] === DEFAULT_REGION

  if (hasCountryPrefix) return NextResponse.next()

  const query = request.nextUrl.search ?? ""
  const redirectPath = pathname === "/" ? "" : pathname
  const redirectUrl = `${request.nextUrl.origin}/${DEFAULT_REGION}${redirectPath}${query}`

  return NextResponse.redirect(redirectUrl, 307)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
