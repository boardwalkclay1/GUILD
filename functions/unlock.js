export default async function unlock(request, env) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return json({ ok: false, error: "missing_fields" });
    }

    // 30 days from now
    const unlock_until = Date.now() + (30 * 24 * 60 * 60 * 1000);

    // Insert or update user
    await env.DB.prepare(`
      INSERT INTO users (username, password, unlock_until, role)
      VALUES (?, ?, ?, 'member')
      ON CONFLICT(username) DO UPDATE SET
        password = excluded.password,
        unlock_until = excluded.unlock_until
    `).bind(username, password, unlock_until).run();

    // Log payment
    await env.DB.prepare(`
      INSERT INTO payments (username, amount, timestamp, method)
      VALUES (?, 50, ?, 'paypal')
    `).bind(username, Date.now()).run();

    return json({
      ok: true,
      unlock_until
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
