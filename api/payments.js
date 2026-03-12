export default async function payments(request, env) {
  try {
    const list = await env.DB.prepare(
      "SELECT * FROM payments ORDER BY timestamp DESC"
    ).all();

    return json({
      ok: true,
      payments: list.results
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
