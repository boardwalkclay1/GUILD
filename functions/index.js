import login from "./login.js";
import register from "./register.js";
import unlock from "./unlock.js";
import check from "./check.js";
import logs from "./logs.js";
import messages from "./messages.js";
import notifications from "./notifications.js";
import payments from "./payments.js";

export async function onRequest(context) {
  const { request, env } = context;
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

  switch (url.pathname) {
    case "/api/login":
      return login(context);

    case "/api/register":
      return register(context);

    case "/api/unlock":
      return unlock(context);

    case "/api/check":
      return check(context);

    case "/api/logs":
      return logs(context);

    case "/api/messages":
      return messages(context);

    case "/api/notifications":
      return notifications(context);

    case "/api/payments":
      return payments(context);

    default:
      return new Response("Not found", { status: 404 });
  }
}
