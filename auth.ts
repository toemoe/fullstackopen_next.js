import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "./app/db"
import { users } from "./db/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "Password"}
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("No credentials")
          return null
        }
        
        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username as string)
        })
      
        if (!user || !user.passwordHash) {
          console.log("No user or no hash")
          return null
        }
      
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        )
      
        console.log("bcrypt result:", isValid)
      
        if (!isValid) return null
      
        return {
          id: String(user.id),
          name: user.name,
          email: user.username
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  },
})