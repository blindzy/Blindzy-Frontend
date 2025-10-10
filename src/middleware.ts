// src/middleware.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // Check cookie
  const token = context.cookies.get("access_token")?.value;
  const path = context.url.pathname;

  // If user is logged in and trying to visit /login → redirect to /user
  if (token && path === "/login") {
    return context.redirect("/user");
  }

  // If user is NOT logged in and trying to visit /user → redirect to /login
  if (!token && path.startsWith("/user")) {
    return context.redirect("/login");
  }

  if (!token && path.startsWith("/checkout")) {
    return context.redirect("/login");
  }

  // Otherwise continue as normal
  return next();
});
