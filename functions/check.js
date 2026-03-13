export async function onRequest(context) {
  const { request, env } = context;

  try {
    const { username } = await request.json();

    if (!username) {
      return json({ ok: false, error: "missing_username" });
    }

    const row = await env.DB.prepare(
      "SELECT unlock_until, role FROM users WHERE username = ?"
    ).bind(username).first();

    if (!row) {
      return json({ ok: false, error: "not_found" });
    }

    // ⭐ Guild Master bypass — ALWAYS OK
    if (username === "Guild Master") {
      return json({
        ok: true,
        unlock_until: row.unlock_until,
        role: "guild_master"
      });
    }

    // ⭐ Normal member expiration check
    if (Date.now() > row.unlock_until) {
      return json({ ok: false, error: "expired" });
    }

    return json({
      ok: true,
      unlock_until: row.unlock_until,
      role: row.role
    });

  } catch (err) {
    return json({
      ok: false,
      error: "server_error",
      details: err.message
    });
  }
}

function json(obj) {
  return new Response(JSON.stringify(obj), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
}
