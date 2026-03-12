export default async function notifications(request, env) {
  try {
    const { username } = await request.json();

    if (!username) {
      return json({ ok: false, error: "missing_username" });
    }

    const list = await env.DB.prepare(
      "SELECT * FROM notifications WHERE username = ? ORDER BY timestamp DESC"
    ).bind(username).all();

    return json({
      ok: true,
      notifications: list.results
    });

  } catch (err) {
    return json({
      ok: false,
      error: "server_error",
      details: err.message
    });
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
