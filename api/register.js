export default async function register(request, env) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return json({ ok: false, error: "missing_fields" });
    }

    // Create user with unlock_until = 0 (not paid yet)
    await env.DB.prepare(`
      INSERT INTO users (username, password, unlock_until, role)
      VALUES (?, ?, 0, 'member')
    `).bind(username, password).run();

    return json({ ok: true });

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
