import webpush from "web-push";
import { neon } from "@neondatabase/serverless";

export async function broadcastNotification(title: string, message: string) {
  try {
    const vapidPublicKey = process.env.VITE_VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VITE_VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      console.error("VAPID keys not configured. Cannot send push notification.");
      return { success: false, error: "VAPID keys not configured." };
    }

    webpush.setVapidDetails(
      "mailto:admin@shreekalyanhospital.com",
      vapidPublicKey,
      vapidPrivateKey,
    );

    const dbUrl = process.env.VITE_NEON_DB_URL;
    if (!dbUrl) {
      console.error("Database URL not configured.");
      return { success: false, error: "Database URL not configured." };
    }

    const sql = neon(dbUrl);

    // Get all subscriptions
    const rows = await sql`SELECT subscription FROM notification_tokens`;

    let successCount = 0;
    let failCount = 0;

    const payload = JSON.stringify({ title, message });

    for (const row of rows) {
      try {
        const subscription = row.subscription as webpush.PushSubscription;
        await webpush.sendNotification(subscription, payload);
        successCount++;
      } catch (err) {
        const pushErr = err as { statusCode?: number; message?: string };
        failCount++;
        console.error("Error sending notification:", err);
        if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
          // Subscription expired/invalid — remove it; wrap in its own try/catch
          // so a DB failure here doesn't abort remaining notifications.
          try {
            await sql`DELETE FROM notification_tokens WHERE subscription::text = ${JSON.stringify(row.subscription)}`;
            console.log("Removed expired subscription.");
          } catch (dbErr) {
            console.error("Failed to remove expired subscription from DB:", dbErr);
          }
        }
      }
    }

    return { success: true, successCount, failCount };
  } catch (error) {
    const e = error as { message?: string };
    console.error("Push Notification Error:", error);
    return { success: false, error: "Failed to send notification", details: e.message };
  }
}
