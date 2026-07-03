import "next-auth"
import "next-auth/adapters"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      data: {
        id: string
        email: string
        is_banned: boolean
      }
    }
  }

  interface User {
    id?: string
    email?: string | null
    is_banned?: boolean | null
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    is_banned?: boolean | null
  }
}
