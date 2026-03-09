export default async function register(request, env) {
  const { username, password } = await request.json();

  if (!username || !password)
    return new Response(JSON.stringify({ ok: false, error: "missing_fields" }));

  await env.DB.prepare(`
    INSERT INTO users (username, password, unlock_until, role)
    VALUES (?, ?, 0, 'member')
  `).bind(username, password).run();

  return new Response(JSON.stringify({ ok: true }));
}
