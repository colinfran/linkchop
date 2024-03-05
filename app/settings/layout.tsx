import React from "react"
import { SettingsNavigation } from "../../components/settings-navigation"
import { Separator } from "@/components/ui/separator"
import TopNavigationAuth from "@/components/top-navigation-auth"
import Footer from "@/components/footer"
// import { useOutlet } from "react-router-dom"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
]

interface Props {
  children: React.ReactNode
}

const SettingsLayout: React.FC<Props> = ({ children }: Props) => {
  // const outlet = useOutlet()
  return (
    <>
      <TopNavigationAuth />
      <div className="w-full space-y-6 py-6 xl:space-y-16">
        <div className="container space-y-2 p-12 md:p-32">
          <div className="size-full space-y-6 p-10 md:block md:p-0">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SettingsNavigation items={sidebarNavItems} />
              </aside>
              <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SettingsLayout
