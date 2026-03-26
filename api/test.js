export default async function testRoute(_req, res) {
  res.status(200).setHeader("Content-Type", "application/json").send(JSON.stringify({ ok: true }));
}

