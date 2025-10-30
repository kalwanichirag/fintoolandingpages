// ✅ Next.js proxy for https://www.fintoo.in/callback-services/
export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("https://www.fintoo.in/callback-services/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    return Response.json(data);
  } catch (error) {
    console.error("Callback Proxy Error:", error);
    return Response.json({ error: "Failed to send callback data" }, { status: 500 });
  }
}
