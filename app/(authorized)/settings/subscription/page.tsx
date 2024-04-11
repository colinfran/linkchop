"use client"
import React, { useEffect, useState } from "react"
import moment from "moment"

import { Separator } from "@/components/ui/separator"

import { useUser } from "@/components/providers/user-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Icons } from "@/assets/icons"

const Page: React.FC = () => {
  const { user, update } = useUser()
  const [loading, setLoading] = useState(false)
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    start_date: "",
    expiration_day: 1,
    status: "",
  })
  const [nextPaymentDate, setNextPaymentDate] = useState<string | null>(null)
  const [remainingDays, setRemainingDays] = useState<number>(0)
  const [unsubscribeLoading, setUnsubscribeLoading] = useState(false)

  const [showDialog, setShowDialog] = useState(false)

  const getNextPaymentDate = (expirationDay: number): string => {
    // Get today's date
    const today = moment()
    // Calculate the next payment date
    let nextPaymentDateval = moment(today).date(expirationDay)
    if (today.date() > expirationDay) {
      nextPaymentDateval = nextPaymentDateval.add(1, "months")
    }
    // Calculate remaining days
    const remainingDays1 = nextPaymentDateval.diff(today, "days")
    setRemainingDays(remainingDays1)
    // Format the output
    let output
    if (remainingDays1 === 0) {
      output = "today"
    } else if (remainingDays1 === 1) {
      const formattedDate = nextPaymentDateval.format("MMMM D")
      output = `${formattedDate} (${remainingDays1} day)`
    } else {
      const formattedDate = nextPaymentDateval.format("MMMM D")
      output = `${formattedDate} (${remainingDays1} days)`
    }
    return output
  }

  useEffect(() => {
    const getSubscriptionInfo = async (): Promise<void> => {
      setLoading(true)
      const response = await fetch("/api/subscription/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user?.id }),
      })
      const val = await response.json()
      setSubscriptionInfo(val[0])
      setNextPaymentDate(getNextPaymentDate(val[0].expiration_day))
      setLoading(false)
    }
    if (user?.is_premium_user) {
      getSubscriptionInfo()
    }
  }, [user?.id, user?.is_premium_user])

  const unsubscribe = async (): Promise<void> => {
    if (subscriptionInfo) {
      setUnsubscribeLoading(true)
      await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          remainingDays: remainingDays,
        }),
      })
      setUnsubscribeLoading(false)
      update()
      setShowDialog(!showDialog)
      // window.location.reload()
    }
  }

  const subscribed = (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">
        {subscriptionInfo.status === "cancelled"
          ? "You have cancelled your subscription"
          : "You are currently subscribed"}
      </h2>
      <div>
        {subscriptionInfo.status === "cancelled"
          ? "You are no longer being charged."
          : "Total charges: $5/month"}
      </div>
      <div>
        {subscriptionInfo.status === "cancelled"
          ? `Last day of access to premium features: ${nextPaymentDate}`
          : `Next payment date: ${nextPaymentDate}`}
      </div>
      <div className="mt-5">
        {subscriptionInfo.status === "active" && (
          <Button onClick={() => setShowDialog(!showDialog)}>Click here to unsubscribe</Button>
        )}
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
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Subscription</h3>
          <p className="text-sm text-muted-foreground">Check your subscription or unsubscribe.</p>
        </div>
        <Separator />
        <div>
          {!user || loading ? (
            <div>
              <Skeleton className="h-[125px] w-[350px] rounded-xl md:w-[450px]" />
            </div>
          ) : (
            <div>{user?.is_premium_user ? subscribed : notSubscribed}</div>
          )}
        </div>
      </div>
      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unsubscribe. This action cannot be undone. You will have{" "}
              {remainingDays > 1 || remainingDays < 1
                ? `${remainingDays} more days`
                : `${remainingDays} more day`}{" "}
              to continue using the premium features until your premium subscription expires. Are
              you sure you want to unsubscribe?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {!unsubscribeLoading && (
              <AlertDialogCancel onClick={() => setShowDialog(!showDialog)}>
                Cancel
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              className={
                unsubscribeLoading
                  ? "shrink grow [flex-basis:auto] [transition:all_0.75s]"
                  : "grow-[0.001] [transition:all_1s]"
              }
              onClick={unsubscribe}
            >
              {unsubscribeLoading ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : (
                "Unsubscribe"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default Page
