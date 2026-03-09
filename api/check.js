export default async function check(request, env) {
  const { username } = await request.json();

  const row = await env.DB.prepare(`
    SELECT unlock_until, role FROM users WHERE username = ?
  `).bind(username).first();

  if (!row) return new Response(JSON.stringify({ ok: false }));

  return new Response(JSON.stringify({
    ok: true,
    unlock_until: row.unlock_until,
    role: row.role
  }));
}
