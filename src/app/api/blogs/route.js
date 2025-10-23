export async function GET() {
  try {
    const res = await fetch("https://www.fintoo.in/blog/wp-json/wp/v2/posts?_embed=1&page=1");
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
