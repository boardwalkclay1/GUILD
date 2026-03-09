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

    if (path === "/api/login") return login(request, env);
    if (path === "/api/register") return register(request, env);
    if (path === "/api/unlock") return unlock(request, env);
    if (path === "/api/check") return check(request, env);
    if (path === "/api/messages") return messages(request, env);
    if (path === "/api/notifications") return notifications(request, env);
    if (path === "/api/payments") return payments(request, env);
    if (path === "/api/logs") return logs(request, env);

    return new Response("Not found", { status: 404 });
  }
};
