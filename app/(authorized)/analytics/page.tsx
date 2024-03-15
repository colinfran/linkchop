"use client"

import React, { useEffect, useState } from "react"
import { useUser } from "@/components/providers/user-provider"
import { useRouter } from "next/navigation"

export type UrlsProps = {
  id: string
  original_url: string
  created_at: string
  visit_count?: number
}

const Page: React.FC = () => {
  const { user } = useUser()
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      if (!user.is_premium_user) {
        router.push("/404")
      } else {
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (loading) return null
  return (
    <>
      <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
        <div className="container space-y-2 p-5 sm:p-12 md:p-12">
          <div>Analytics Page</div>
        </div>
      </div>
    </>
  )
}

export default Page
