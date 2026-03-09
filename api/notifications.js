export default async function notifications(request, env) {
  const list = await env.DB.prepare(`
    SELECT * FROM notifications WHERE username = ? ORDER BY timestamp DESC
  `).bind("Guild Master").all();

  return new Response(JSON.stringify(list.results));
}
