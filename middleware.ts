import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { publicRoutes } from "./middleware.config"
import { verify } from "jsonwebtoken"

interface DecodedToken {
  id: number;
  email: string;
  role: string;
}

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("auth_token")?.value

    // Allow access to public routes
    if (
      publicRoutes.some((route) => pathname.startsWith(route)) ||
      pathname.startsWith("/share/business-card/") // เพิ่มเส้นทางสำหรับแชร์นามบัตร
    ) {
      return NextResponse.next()
    }

    // Check if user is trying to access admin routes
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      try {
        // ตรวจสอบ token และ role
        const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key", {
          algorithms: ["HS256"],
          maxAge: "1d"
        }) as DecodedToken

        if (decoded.role !== "ผู้ดูแลระบบ") {
          return NextResponse.redirect(new URL("/user/dashboard", request.url))
        }
      } catch (error) {
        // ถ้า token ไม่ถูกต้อง ให้ลบ cookie และ redirect ไปหน้า login
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("auth_token")
        return response
      }

      return NextResponse.next()
    }

    // Check if user is trying to access user routes
    if (pathname.startsWith("/user")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      try {
        // ตรวจสอบ token
        verify(token, process.env.JWT_SECRET || "your-secret-key", {
          algorithms: ["HS256"],
          maxAge: "1d"
        }) as DecodedToken
      } catch (error) {
        // ถ้า token ไม่ถูกต้อง ให้ลบ cookie และ redirect ไปหน้า login
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("auth_token")
        return response
      }

      return NextResponse.next()
    }

    // Default behavior for other routes
    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // ในกรณีที่เกิด error ให้ redirect ไปหน้า login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
