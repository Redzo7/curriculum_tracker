import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import bcrypt from "bcrypt";
import { db } from "..";
import { users } from "./users";


async function main() {
  console.log("Checking environment...");
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env.local");
  }

  const hashedPassword = await bcrypt.hash("password123", 12);

  await db.insert(users).values({
    firstName: "SYSTEM",
    lastName: "Admin",
    email: "rezsohosi@gmail.com",
    password: hashedPassword,
  }).onConflictDoNothing();

  console.log("✅ Seeding finished!");
  process.exit(0);
}

main().catch(console.error);