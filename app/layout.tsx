import "./globals.css"

import { GeistSans } from "geist/font/sans"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

const title = "Next.js + Postgres Auth Starter"
const description =
  "This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a Postgres database to persist the data."

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
}

interface Props {
  session: Session | null
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children, session }) => {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
