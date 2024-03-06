/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt-ts"
import { getUser } from "app/db"
import { authConfig } from "@/app/auth/auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // @ts-expect-error type error bug see here https://github.com/nextauthjs/next-auth/issues/2701
      async authorize(credentials: Credentials): Promise<any> {
        const { email, password } = credentials
        const user = await getUser(email)
        if (user.length === 0) return new Error("test")
        const passwordsMatch = await compare(password, user[0].password!)
        if (passwordsMatch) return user[0] as any
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.user = { ...session.user, ...token }
      return session
    },
    jwt: ({ token, user }) => {
      let newVal = token
      if (user) {
        newVal = {
          data: user,
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
