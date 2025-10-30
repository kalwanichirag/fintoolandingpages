// ✅ Next.js API route to proxy the Verify OTP API
export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("https://www.fintoo.in/restapi/verifyotpapi/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    console.error("Verify OTP Proxy Error:", error);
    return Response.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
