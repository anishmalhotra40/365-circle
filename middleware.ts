// root-level middleware.ts (keep this file)
import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
	const response = NextResponse.next()

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value
				},
				set(name: string, value: string, options) {
					response.cookies.set(name, value, options)
				},
				remove(name: string, options) {
					response.cookies.set(name, "", { ...options, maxAge: -1 })
				},
			},
		}
	)

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session && request.nextUrl.pathname.startsWith("/admin")) {
		const url = request.nextUrl.clone()
		url.pathname = "/login"
		return NextResponse.redirect(url)
	}

	return response
}

export const config = {
	matcher: ["/admin/:path*", "/login"],
}
