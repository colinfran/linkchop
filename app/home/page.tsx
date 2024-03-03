import React from "react"
import TopNavigationAuth from "@/components/top-navigation-auth"
import { auth } from "@/app/auth/auth"

const HomeAuthenticatedPage: React.FC = async () => {
  const session = await auth()

  return (
    <>
      <TopNavigationAuth />
      <div className="flex h-screen bg-black">
        <div className="flex h-screen w-screen flex-col items-center justify-center space-y-5 text-white">
          You are logged in as {session?.user?.email}
        </div>
      </div>
    </>
  )
}

export default HomeAuthenticatedPage
