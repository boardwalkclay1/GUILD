export default async function check(request, env) {
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

    return json({
      ok: true,
      unlock_until: row.unlock_until,
      role: row.role
    });

  } catch (err) {
    return json({ ok: false, error: "server_error", details: err.message });
  }
}

// Shared JSON + CORS helper
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
