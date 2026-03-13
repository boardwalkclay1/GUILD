import login from "./login.js";
import register from "./register.js";
import unlock from "./unlock.js";
import check from "./check.js";
import logs from "./logs.js";
import messages from "./messages.js";
import notifications from "./notifications.js";
import payments from "./payments.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        }
      });
    }

    if (url.pathname === "/api/login") return login(request, env);
    if (url.pathname === "/api/register") return register(request, env);
    if (url.pathname === "/api/unlock") return unlock(request, env);
    if (url.pathname === "/api/check") return check(request, env);
    if (url.pathname === "/api/logs") return logs(request, env);
    if (url.pathname === "/api/messages") return messages(request, env);
    if (url.pathname === "/api/notifications") return notifications(request, env);
    if (url.pathname === "/api/payments") return payments(request, env);

    return new Response("Not found", { status: 404 });
  }
};
