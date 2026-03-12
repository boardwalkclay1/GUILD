import login from "./login.js";
import register from "./register.js";
import unlock from "./unlock.js";
import check from "./check.js";
import messages from "./messages.js";
import notifications from "./notifications.js";
import payments from "./payments.js";
import logs from "./logs.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // ============================
    // 1. CORS + OPTIONS SUPPORT
    // ============================
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    // ============================
    // 2. ROUTING
    // ============================
    if (path === "/api/login") return login(request, env);
    if (path === "/api/register") return register(request, env);
    if (path === "/api/unlock") return unlock(request, env);
    if (path === "/api/check") return check(request, env);
    if (path === "/api/messages") return messages(request, env);
    if (path === "/api/notifications") return notifications(request, env);
    if (path === "/api/payments") return payments(request, env);
    if (path === "/api/logs") return logs(request, env);

    // ============================
    // 3. FALLBACK
    // ============================
    return new Response(JSON.stringify({ ok: false, error: "not_found" }), {
      status: 404,
      headers: corsHeaders()
    });
  }
};

// ============================
// GLOBAL CORS HEADERS
// ============================
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}
