export default async function payments(request, env) {
  const list = await env.DB.prepare(`
    SELECT * FROM payments ORDER BY timestamp DESC
  `).all();

  return new Response(JSON.stringify(list.results));
}
