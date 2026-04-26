import { neon } from "@neondatabase/serverless";
import { broadcastNotification } from "../src/lib/server/push";

interface AppointmentInput {
  patient_name: string;
  phone_number: string;
  reason?: string;
  appointment_date: string;
  appointment_time: string;
}

interface VercelRequest {
  method?: string;
  body?: Partial<AppointmentInput>;
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

  const { patient_name, phone_number, reason, appointment_date, appointment_time } =
    req.body ?? {};

  if (!patient_name || !phone_number || !appointment_date || !appointment_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const dbUrl = process.env.VITE_NEON_DB_URL;
  if (!dbUrl) {
    return res.status(500).json({ error: "Database not configured" });
  }

  try {
    const sql = neon(dbUrl);

    // Check for existing booking at the same time
    const existing = await sql`
      SELECT id FROM appointments 
      WHERE appointment_date = ${appointment_date}::DATE 
      AND appointment_time = ${appointment_time}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return res.status(409).json({ error: "This slot is already booked. Please choose another time." });
    }

    await sql`
      INSERT INTO appointments (
        patient_name,
        phone_number,
        reason,
        appointment_date,
        appointment_time
      ) VALUES (
        ${patient_name},
        ${phone_number},
        ${reason || ""},
        ${appointment_date}::DATE,
        ${appointment_time}
      )
    `;

    // Trigger notification asynchronously — do not block response
    broadcastNotification(
      "Appointment Confirmed",
      `Your appointment is confirmed for ${appointment_date} at ${appointment_time}.`,
    ).catch((err) => console.error("[book-appointment] Notification failed:", err));

    return res.status(200).json({ success: true });
  } catch (err) {
    const e = err as { message?: string };
    console.error("[book-appointment] DB error:", err);
    return res.status(500).json({ success: false, error: "Failed to save appointment", details: e.message });
  }
}
