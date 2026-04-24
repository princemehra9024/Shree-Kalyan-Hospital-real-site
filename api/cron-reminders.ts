import { neon } from '@neondatabase/serverless';
import { broadcastNotification } from '../src/lib/server/push';

export default async function handler(req: any, res: any) {
  // Optional: Check authorization header if you want to secure the cron job 
  // (Vercel sends a CRON secret you can verify)
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}` && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const dbUrl = process.env.VITE_NEON_DB_URL;
    if (!dbUrl) {
      return res.status(500).json({ error: 'Database URL not configured.' });
    }

    const sql = neon(dbUrl);

    // Calculate target time: current time + 30 minutes
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    
    // Format date as YYYY-MM-DD
    const targetDateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // Format as YYYY-MM-DD
    
    // Format time to match "09:00 AM" or "02:30 PM"
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Round minutes to nearest 30 since appointments are at :00 or :30
    if (minutes < 15) minutes = 0;
    else if (minutes < 45) minutes = 30;
    else { minutes = 0; hours++; }
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // Convert 0 to 12
    const hStr = hour12 < 10 ? `0${hour12}` : `${hour12}`;
    const mStr = minutes === 0 ? '00' : '30';
    
    const targetTimeStr = `${hStr}:${mStr} ${ampm}`;

    console.log(`Cron checking for appointments on ${targetDateStr} at ${targetTimeStr}`);

    // Query appointments
    const appointments = await sql`
      SELECT patient_name, appointment_time 
      FROM appointments 
      WHERE appointment_date = ${targetDateStr}::DATE 
      AND appointment_time = ${targetTimeStr}
    `;

    console.log(`Found ${appointments.length} appointments 30 minutes away.`);

    let notificationsSent = 0;
    if (appointments.length > 0) {
      for (const appt of appointments) {
        const title = "Upcoming Appointment Reminder";
        const message = `Reminder: ${appt.patient_name} has an appointment scheduled at ${appt.appointment_time}.`;
        await broadcastNotification(title, message);
        notificationsSent++;
      }
    }

    return res.status(200).json({ 
      success: true, 
      appointmentsFound: appointments.length, 
      notificationsSent 
    });

  } catch (error: any) {
    console.error("Cron Error:", error);
    return res.status(500).json({ error: 'Failed to process reminders', details: error.message });
  }
}
