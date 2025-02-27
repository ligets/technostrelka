import { NextResponse } from "next/server";
import { ParseToken } from "@/utils/auth";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const authRoutes = ["/lk"];
const adminRoutes = ["/admin"];
const guestRoutes = ["/forgot-password", "/login", "/password-reset", "/register"];

export async function middleware(request) {
    const token = request.cookies.get("access_token");
    const refreshToken = request.cookies.get("refresh_token");

    const isAuthRoute = authRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );
    const isGuestRoute = guestRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );
    const isAdminRoute = adminRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    // Если нет токенов для защищенных маршрутов
    if (!token && (isAuthRoute || isAdminRoute)) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
        return NextResponse.redirect(redirectUrl);
    }

    const response = NextResponse.next();

    if (token) {
        try {
            // Проверка токена
            const decoded = ParseToken(token.value);
            const currentTime = Math.floor(Date.now() / 1000);

            // Если токен истек
            if (decoded.exp <= currentTime && refreshToken) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST_AUTH}/Authentication/Refresh`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refreshToken: refreshToken.value }),
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    response.cookies.delete("access_token");
                    response.cookies.delete("refresh_token");
                    // Установка новых токенов
                    response.cookies.set("access_token", data.access_token, {
                        path: "/",
                        httpOnly: false,
                        maxAge: 60 * 60 * 24 * 30, // 30 дней
                    });

                    response.cookies.set("refresh_token", data.refresh_token, {
                        path: "/",
                        httpOnly: false,
                        maxAge: 60 * 60 * 24 * 365, // 1 год
                    });

                    const newDecoded = ParseToken(data.access_token);

                    // Проверка роли для админ-маршрутов
                    if (isAdminRoute && newDecoded.role !== "Admin") {
                        const redirect = NextResponse.redirect(new URL("/", request.url));
                        return redirect;
                    }
                } else {
                    // Если обновление токена не удалось
                    response.cookies.delete("access_token");
                    response.cookies.delete("refresh_token");
                    const redirectUrl = new URL("/login", request.url);
                    redirectUrl.searchParams.set("error", "session_expired");
                    return NextResponse.redirect(redirectUrl);
                }
            }

            // Проверка роли на админ-маршрутах
            if (isAdminRoute && decoded.role !== "Admin") {
                const redirect = NextResponse.redirect(new URL("/", request.url));
                return redirect;
            }
        } catch (error) {
            // В случае любой ошибки
            console.log(error)
            response.cookies.delete("access_token");
            response.cookies.delete("refresh_token");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
