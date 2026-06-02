import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "../../db/schema"

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, {
  schema,
})
console.log("BUILD VERSION 123")