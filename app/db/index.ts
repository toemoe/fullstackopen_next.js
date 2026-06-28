import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "../../db/schema"

const sql = neon(process.env.BLOGS_STORAGE_DATABASE_URL!)
export const db = drizzle(sql, {
  schema,
  logger: true,
})
console.log("BUILD VERSION 123")