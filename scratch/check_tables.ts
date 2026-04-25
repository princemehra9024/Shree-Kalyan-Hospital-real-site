import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.VITE_NEON_DB_URL!);

async function checkTables() {
  try {
    const result =
      await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'appointments'`;
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkTables();
