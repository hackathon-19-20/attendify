import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from './lib/auth';

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const isAuth = await getCookie("authToken");
    const isLogin = pathname.startsWith("/login");
    const isSignUp = pathname.startsWith("/sign-up");

    const sensitiveRoutes = ["/dashboard"];
    const isAccessingSensitiveRoutes = sensitiveRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isLogin && isAuth)
        return NextResponse.redirect(new URL("/dashboard", req.url));

    if (isSignUp && isAuth)
        return NextResponse.redirect(new URL("/dashboard", req.url));

    if (!isAuth && isAccessingSensitiveRoutes)
        return NextResponse.redirect(new URL("/login", req.url));

}

export const config = {
    matcher: ["/", "/login", "/sign-up", "/dashboard/:path*"],
}