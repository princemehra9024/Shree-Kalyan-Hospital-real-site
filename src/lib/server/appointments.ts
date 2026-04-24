import { neon } from "@neondatabase/serverless";

// Fallback to import.meta.env for Vite clients, or process.env for Node
const dbUrl = import.meta.env?.VITE_NEON_DB_URL || (typeof process !== 'undefined' ? process.env.VITE_NEON_DB_URL : undefined);

if (!dbUrl) {
  console.warn("VITE_NEON_DB_URL is missing. Please check your environment variables.");
}

const sql = neon(dbUrl || "postgresql://mock");

export interface AppointmentInput {
  patient_name: string;
  phone_number: string;
  reason?: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // e.g. "09:00 AM"
}

export async function getBookedSlots(dateStr: string): Promise<string[]> {
  try {
    const rows = (await sql`
      SELECT appointment_time 
      FROM appointments 
      WHERE appointment_date = ${dateStr}::DATE
    `) as { appointment_time: string }[];
    return rows.map((row) => row.appointment_time);
  } catch (err) {
    console.error("Error fetching booked slots:", err);
    return [];
  }
}

export async function bookAppointment(data: AppointmentInput): Promise<boolean> {
  try {
    await sql`
      INSERT INTO appointments (
        patient_name, 
        phone_number, 
        reason, 
        appointment_date, 
        appointment_time
      ) VALUES (
        ${data.patient_name}, 
        ${data.phone_number}, 
        ${data.reason || ""}, 
        ${data.appointment_date}::DATE, 
        ${data.appointment_time}
      )
    `;
    return true;
  } catch (err) {
    console.error("Error booking appointment:", err);
    return false;
  }
}

export async function saveNotificationToken(token: string): Promise<boolean> {
  try {
    await sql`
      INSERT INTO notification_tokens (token)
      VALUES (${token})
      ON CONFLICT (token) DO NOTHING
    `;
    return true;
  } catch (err) {
    console.error("Error saving notification token:", err);
    return false;
  }
}
