export default async function unlock(request, env) {
  const { username, password } = await request.json();

  if (!username || !password)
    return new Response(JSON.stringify({ ok: false, error: "missing_fields" }));

  const unlockUntil = Date.now() + (30 * 24 * 60 * 60 * 1000);

  await env.DB.prepare(`
    INSERT INTO users (username, password, unlock_until, role)
    VALUES (?, ?, ?, 'member')
    ON CONFLICT(username) DO UPDATE SET
      password = excluded.password,
      unlock_until = excluded.unlock_until
  `).bind(username, password, unlockUntil).run();

  await env.DB.prepare(`
    INSERT INTO payments (username, amount, timestamp, method)
    VALUES (?, 50, ?, 'paypal')
  `).bind(username, Date.now()).run();

  return new Response(JSON.stringify({ ok: true, unlockUntil }));
}
