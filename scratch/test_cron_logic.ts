import cronHandler from "../api/cron-reminders";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testCron() {
  console.log("Starting cron test...");

  // Create mock request and response
  const req = {
    method: "GET",
    headers: {
      authorization: `Bearer ${process.env.CRON_SECRET}`,
    },
  };

  const res = {
    status: (code: number) => {
      console.log(`Response Status: ${code}`);
      return res;
    },
    json: (data: any) => {
      console.log("Response JSON:", JSON.stringify(data, null, 2));
      return res;
    },
  };

  try {
    await cronHandler(req as any, res as any);
  } catch (err) {
    console.error("Test failed with error:", err);
  }
}

testCron();
