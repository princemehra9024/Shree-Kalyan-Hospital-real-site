import webpush from 'web-push';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testPush() {
  try {
    const vapidPublicKey = process.env.VITE_VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VITE_VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      console.error('VAPID keys not configured.');
      return;
    }

    webpush.setVapidDetails(
      'mailto:admin@shreekalyanhospital.com',
      vapidPublicKey,
      vapidPrivateKey
    );

    const dbUrl = process.env.VITE_NEON_DB_URL;
    if (!dbUrl) {
      console.error('Database URL not configured.');
      return;
    }

    const sql = neon(dbUrl);

    // Get all subscriptions
    console.log("Fetching subscriptions from the database...");
    const rows = await sql`SELECT subscription FROM notification_tokens`;
    console.log(`Found ${rows.length} subscriptions.`);
    
    let successCount = 0;
    let failCount = 0;

    const payload = JSON.stringify({ 
      title: 'Test Notification', 
      message: 'Checking if it works! This is a test push notification.' 
    });

    for (const row of rows) {
      try {
        const subscription = row.subscription as webpush.PushSubscription;
        console.log(`Sending to endpoint: ${subscription.endpoint.substring(0, 50)}...`);
        await webpush.sendNotification(subscription, payload);
        successCount++;
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          console.log("Subscription expired or invalid, deleting...");
          await sql`DELETE FROM notification_tokens WHERE subscription::text = ${JSON.stringify(row.subscription)}`;
        }
        console.error("Error sending notification to a token:", err.message || err);
        failCount++;
      }
    }

    console.log(`\nCompleted. Success: ${successCount}, Failed: ${failCount}`);
  } catch (error: any) {
    console.error("Push Notification Error:", error);
  }
}

testPush();
