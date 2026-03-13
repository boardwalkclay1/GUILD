export default async function login(request, env) {
  try {
    // Parse JSON safely
    const { username, password } = await request.json();

    if (!username || !password) {
      return json({ ok: false, error: "missing_fields" });
    }

    // Query D1
    const row = await env.DB.prepare(
      "SELECT * FROM users WHERE username = ?"
    ).bind(username).first();

    if (!row) {
      return json({ ok: false, error: "not_found" });
    }

    if (row.password !== password) {
      return json({ ok: false, error: "wrong_pass" });
    }

    // Success
    return json({
      ok: true,
      unlock_until: row.unlock_until,
      role: row.role
    });

  } catch (err) {
    return json({ ok: false, error: "server_error", details: err.message });
  }
}

// Helper: consistent JSON + CORS
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
