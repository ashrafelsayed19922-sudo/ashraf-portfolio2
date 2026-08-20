export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Count only actual page visits, not images/CSS/JS files
    if (
      request.method === "GET" &&
      (url.pathname === "/" || url.pathname === "/index.html")
    ) {
      const current = Number(await env.KV.get("visits") || "0");
      const visits = current + 1;

      await env.KV.put("visits", String(visits));
    }

    // Serve the portfolio normally
    return env.ASSETS.fetch(request);
  }
};
