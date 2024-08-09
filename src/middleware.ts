import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher([
    "/",
    "/auth/signup",
    "/auth/signin",
    "/home",
])

const isPublicApiRoute = createRouteMatcher(["/api/videos"])

export default clerkMiddleware((auth, req) => {
    const { userId } = auth()
    const currentUrl = new URL(req.url)
    const isDashboardAccess = currentUrl.pathname === "/home"
    const isApiRequest = currentUrl.pathname.startsWith("/api")

    /* public  route acess  on  logged in*/
    if (userId && isPublicRoute(req) && !isDashboardAccess) {
        return NextResponse.redirect(new URL("/home", req.url))
    }

    if (!userId) {
        /* private  route acess  on not logged in*/
        if (!isPublicRoute(req) && !isPublicApiRoute(req))
            return NextResponse.redirect(new URL("/auth/signin", req.url))

        /* private api route acess  on not logged in*/
        if (isApiRequest && !isPublicApiRoute(req))
            return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
