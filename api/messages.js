export default async function messages(request, env) {
  if (request.method === "POST") {
    const { username, message } = await request.json();

    await env.DB.prepare(`
      INSERT INTO messages (username, message, timestamp)
      VALUES (?, ?, ?)
    `).bind(username, message, Date.now()).run();

    return new Response(JSON.stringify({ ok: true }));
  }

  const list = await env.DB.prepare(`
    SELECT * FROM messages ORDER BY timestamp DESC
  `).all();

  return new Response(JSON.stringify(list.results));
}
