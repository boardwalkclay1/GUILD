export default async function login(request, env) {
  const { username, password } = await request.json();

  const row = await env.DB.prepare(`
    SELECT * FROM users WHERE username = ?
  `).bind(username).first();

  if (!row) return new Response(JSON.stringify({ ok: false, error: "not_found" }));
  if (row.password !== password)
    return new Response(JSON.stringify({ ok: false, error: "wrong_pass" }));

  return new Response(JSON.stringify({
    ok: true,
    unlock_until: row.unlock_until,
    role: row.role
  }));
}
