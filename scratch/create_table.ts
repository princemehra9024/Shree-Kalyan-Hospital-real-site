import { neon } from "@neondatabase/serverless";

const dbUrl =
  "postgresql://neondb_owner:npg_DJqBKE5dp7rY@ep-blue-forest-aeo5q88m-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require";
const sql = neon(dbUrl);

async function createTable() {
  try {
    console.log("Creating table...");
    await sql`
      CREATE TABLE IF NOT EXISTS notification_tokens (
        id SERIAL PRIMARY KEY,
        token TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table created or already exists.");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

createTable();
