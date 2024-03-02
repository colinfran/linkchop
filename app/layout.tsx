import "../assets/css/globals.css"
import { GeistSans } from "geist/font/sans"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { ThemeProvider } from "@/components/theme-provider"

const title = "LinkSnip - URL Shortener"
const description =
  "LinkSnip - Your Ultimate URL Shortener! Shorten, track, and manage your links effortlessly with LinkSnip. Our platform offers both free and premium features, allowing you to shrink URLs for easy sharing and monitor their performance with detailed analytics. Start maximizing your link management experience today with LinkSnip!"

export const metadata = {
  title,
  description,
  // twitter: {
  //   card: "summary_large_image",
  //   title,
  //   description,
  // },
  // metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
}

interface Props {
  session: Session | null
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children, session }) => {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
