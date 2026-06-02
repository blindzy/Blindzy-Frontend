import type { APIRoute } from "astro";

export const prerender = false;

// Same-origin proxy for remote images so the browser can read their pixels on a
// <canvas> (color sampling). The backend static server does not send CORS
// headers, so a direct cross-origin fetch is blocked / taints the canvas.
export const GET: APIRoute = async ({ url }) => {
  const target = url.searchParams.get("url");
  if (!target) {
    return new Response("Missing 'url' query param", { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new Response("Invalid 'url' query param", { status: 400 });
  }

  // SSRF guard: only proxy images from the configured API origin.
  const allowedOrigin = new URL(import.meta.env.PUBLIC_API_URL).origin;
  if (parsed.origin !== allowedOrigin) {
    return new Response("Forbidden origin", { status: 403 });
  }

  const upstream = await fetch(parsed.toString());
  if (!upstream.ok) {
    return new Response(`Upstream error ${upstream.status}`, {
      status: upstream.status,
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
