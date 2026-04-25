import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const sql = neon(process.env.VITE_NEON_DB_URL!);

async function migrate() {
  try {
    console.log("Dropping existing notification_tokens table...");
    await sql`DROP TABLE IF EXISTS notification_tokens`;

    console.log("Creating new notification_tokens table with JSONB subscription...");
    await sql`
      CREATE TABLE notification_tokens (
        id SERIAL PRIMARY KEY,
        subscription JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Migration successful.");
  } catch (e) {
    console.error("Migration failed:", e);
  }
}

migrate();
