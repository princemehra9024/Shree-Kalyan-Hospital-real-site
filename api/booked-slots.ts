import { neon } from "@neondatabase/serverless";

interface VercelRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
}
interface VercelResponse {
  status(code: number): this;
  json(body: unknown): unknown;
  setHeader(name: string, value: string): this;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const date = req.query.date as string | undefined;
  if (!date) {
    return res.status(400).json({ error: "Missing required query param: date" });
  }

  const dbUrl = process.env.VITE_NEON_DB_URL;
  if (!dbUrl) {
    return res.status(500).json({ error: "Database not configured" });
  }

  try {
    const sql = neon(dbUrl);
    const rows = (await sql`
      SELECT appointment_time
      FROM appointments
      WHERE appointment_date = ${date}::DATE
    `) as { appointment_time: string }[];

    const slots = rows.map((r) => r.appointment_time);
    return res.status(200).json({ slots });
  } catch (err) {
    const e = err as { message?: string };
    console.error("[booked-slots] DB error:", err);
    return res.status(500).json({ error: "Failed to fetch slots", details: e.message });
  }
}
