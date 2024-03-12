"use client"
import React from "react"

import { Separator } from "@/components/ui/separator"

import { useUser } from "@/components/user-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const SettingsSubscription: React.FC = () => {
  const { user } = useUser()

  const subscribed = (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">You are currently subscribed</h2>
      <div>Total charges: $5/month</div>

      <div className="mt-5">
        <Link className="underline" href="/subscribe/cancel">
          <Button>Click here to unsubscribe</Button>
        </Link>
      </div>
    </div>
  )

  const notSubscribed = (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">You are not subscribed</h2>
      <div className="mt-5">
        What are you waiting for! Sign up and get access to all the premium features!
      </div>
      <div className="mt-5">
        <Link className="underline" href="/subscribe">
          <Button>Click here to subscribe</Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription</h3>
        <p className="text-sm text-muted-foreground">Check your subscription or unsubscribe.</p>
      </div>
      <Separator />
      <div>
        {!user ? (
          <div>
            <Skeleton className="h-[125px] w-[350px] rounded-xl md:w-[450px]" />
          </div>
        ) : (
          <div>{user?.is_premium_user ? subscribed : notSubscribed}</div>
        )}
      </div>
    </div>
  )
}
export default SettingsSubscription
