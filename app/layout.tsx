import React from "react"
import "../assets/css/globals.css"
import { GeistSans } from "geist/font/sans"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Session } from "next-auth/types"
import { VercelAnalytics } from "@/components/analytics-provider"
import { UserProvider } from "@/components/user-provider"

const title = "LinkChop - URL Shortener"
const description =
  "LinkChop - Your Ultimate URL Shortener! Shorten, track, and manage your links effortlessly with LinkChop. Our platform offers both free and premium features, allowing you to shrink URLs for easy sharing and monitor their performance with detailed analytics. Start maximizing your link management experience today with LinkChop!"

export const metadata = {
  title,
  description,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icons/favicon-black.ico",
        href: "/icons/favicon-black.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icons/favicon-white.ico",
        href: "/icons/favicon-white.ico",
      },
    ],
  },
}

type Props = {
  session: Session | null
  children?: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RootLayout: React.FC<any> = ({ children, session }: Props) => {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <SessionProvider session={session}>
            <UserProvider>{children}</UserProvider>
          </SessionProvider>
        </ThemeProvider>
        <VercelAnalytics />
      </body>
    </html>
  )
}

export default RootLayout
