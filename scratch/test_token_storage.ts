import { saveNotificationToken } from "../src/lib/server/appointments";
import dotenv from "dotenv";
import path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Re-import after setting env if necessary, but appointments.ts already initialized with the variable
// Wait, appointments.ts initializes 'sql' at the top level.
// I might need to mock or re-initialize it.

async function testSaveToken() {
  const testSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/test-endpoint-" + Date.now(),
    keys: {
      p256dh: "mock-p256dh-key",
      auth: "mock-auth-key",
    },
  };
  console.log("Saving test subscription:", testSubscription.endpoint);

  // Since appointments.ts might have already failed to initialize 'sql' if imported before dotenv
  // We should check if the env is set now.
  if (!process.env.VITE_NEON_DB_URL) {
    console.error("VITE_NEON_DB_URL still missing in process.env");
    return;
  }

  const success = await saveNotificationToken(testSubscription as any);
  console.log("Success:", success);
}

testSaveToken();
