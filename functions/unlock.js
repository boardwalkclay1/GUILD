export async function onRequest(context) {
  const { request, env } = context;

  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return json({ ok: false, error: "missing_fields" });
    }

    const isGuildMaster = username.toLowerCase() === "guildmaster";

    // If Guild Master → effectively never expires (e.g., 100 years)
    const unlock_until = isGuildMaster
      ? Date.now() + (100 * 365 * 24 * 60 * 60 * 1000)
      : Date.now() + (30 * 24 * 60 * 60 * 1000);

    const role = isGuildMaster ? "guild_master" : "member";

    await env.DB.prepare(`
      INSERT INTO users (username, password, unlock_until, role)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(username) DO UPDATE SET
        password = excluded.password,
        unlock_until = excluded.unlock_until,
        role = excluded.role
    `).bind(username, password, unlock_until, role).run();

    await env.DB.prepare(`
      INSERT INTO payments (username, amount, timestamp, method)
      VALUES (?, ?, ?, ?)
    `).bind(username, isGuildMaster ? 0 : 50, Date.now(), isGuildMaster ? "system" : "paypal").run();

    return json({
      ok: true,
      unlock_until,
      role
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
