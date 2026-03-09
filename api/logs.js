export default async function logs(request, env) {
  const list = await env.DB.prepare(`
    SELECT * FROM login_logs ORDER BY timestamp DESC
  `).all();

  return new Response(JSON.stringify(list.results));
}
