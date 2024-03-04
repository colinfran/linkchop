import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      data: {
        id: string
        name: string
        email: string
        is_premium_user: string
        created_at: string
        updated_at: string
      }
    }
  }
}
