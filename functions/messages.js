export default async function messages(request, env) {
  try {
    // ============================
    // POST → create a message
    // ============================
    if (request.method === "POST") {
      const { username, message } = await request.json();

      if (!username || !message) {
        return json({ ok: false, error: "missing_fields" });
      }

      await env.DB.prepare(`
        INSERT INTO messages (username, message, timestamp)
        VALUES (?, ?, ?)
      `).bind(username, message, Date.now()).run();

      return json({ ok: true });
    }

    // ============================
    // GET → list all messages
    // ============================
    const list = await env.DB.prepare(
      "SELECT * FROM messages ORDER BY timestamp DESC"
    ).all();

    return json({
      ok: true,
      messages: list.results
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
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    }
  });
}
