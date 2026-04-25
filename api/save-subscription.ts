import { neon } from "@neondatabase/serverless";

interface VercelRequest {
  method?: string;
  body?: { subscription?: object };
}
interface VercelResponse {
  status(code: number): this;
  json(body: unknown): unknown;
  setHeader(name: string, value: string): this;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subscription } = req.body ?? {};
  if (!subscription) {
    return res.status(400).json({ error: "Missing subscription object" });
  }

  const dbUrl = process.env.VITE_NEON_DB_URL;
  if (!dbUrl) {
    return res.status(500).json({ error: "Database not configured" });
  }

  try {
    const sql = neon(dbUrl);
    const jsonSub = JSON.stringify(subscription);
    await sql`
      INSERT INTO notification_tokens (subscription)
      VALUES (${jsonSub}::jsonb)
      ON CONFLICT DO NOTHING
    `;
    return res.status(200).json({ success: true });
  } catch (err) {
    const e = err as { message?: string };
    console.error("[save-subscription] DB error:", err);
    return res.status(500).json({ success: false, error: "Failed to save subscription", details: e.message });
  }
}
