import { neon } from "@neondatabase/serverless";
import { broadcastNotification } from "./push";

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
    
    // Trigger push notification asynchronously
    broadcastNotification(
      'Appointment Confirmed',
      `Your appointment is confirmed for ${data.appointment_date} at ${data.appointment_time}.`
    ).catch(err => console.error("Failed to trigger notification:", err));

    return true;
  } catch (err) {
    console.error("Error booking appointment:", err);
    return false;
  }
}

export async function saveNotificationToken(subscription: any): Promise<boolean> {
  try {
    const jsonSub = JSON.stringify(subscription);
    // Use jsonb for proper insertion
    await sql`
      INSERT INTO notification_tokens (subscription)
      VALUES (${jsonSub}::jsonb)
    `;
    return true;
  } catch (err) {
    console.error("Error saving notification subscription:", err);
    return false;
  }
}
