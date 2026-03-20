export default async function handler(req, res) {
  console.log("🔥 요청 들어옴");
  console.log("📦 데이터:", req.body);

  res.status(200).json({ ok: true });
}
