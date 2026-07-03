import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt-ts"
import { getUser } from "@/db/tasks"
import { authConfig } from "@/app/api/auth/auth.config"

/**
 * Auth module for user authentication using NextAuth.
 * Provides authentication handlers, sign-in, and sign-out functionality.
 * @module Auth
 */

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // Authorization function for credentials provider.
      async authorize(credentials): Promise<User | null> {
        const { email, password } = credentials
        const user = await getUser(email as string)
        // Check if user exists and compare passwords.
        if (user?.length === 0) return null
        const passwordsMatch = await compare(password as string, user[0].password!)
        if (passwordsMatch) return user[0] as User
        return null
      },
    }),
  ],
  callbacks: {
    // Session callback to update user session data.
    session: ({ session, token }) => {
      session.user = { ...session.user, ...token }
      return session
    },
    // JWT callback to format JWT token data.
    jwt: async ({ token, user }) => {
      let newVal = token
      if (user) {
        newVal = {
          data: {
            id: user?.id,
            email: user?.email,
            is_banned: Boolean(user?.is_banned),
          },
          exp: token.exp,
          iat: token.iat,
          jti: token.jti,
          sub: token.sub,
        }
      }
      return newVal
    },
  },
})
