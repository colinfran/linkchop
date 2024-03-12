"use client"
import React, { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TopNavigationAuth from "@/components/top-navigation-auth"
import { useRouter } from "next/navigation"
import { useUser } from "@/components/user-provider"

const Cancel: React.FC = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user?.email) {
      if (!user?.is_premium_user) {
        router.push("/subscribe")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
        <div className="container mt-[5%] space-y-2 p-5 sm:p-12 md:mt-[8%] md:p-12">
          <Card className="p-20">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Cancel Subscription</h1>
              <p className="text-gray-500 dark:text-gray-400">
                We&apos;re sorry to see you go. Please fill out the form below to cancel your
                subscription.
              </p>
            </div>
            <div className="w-full space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for cancellation</Label>
                  <Textarea id="reason" placeholder="Enter your reason for cancellation" required />
                </div>
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </form>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Cancellation confirmed</h2>
                <p>
                  Your subscription has been cancelled. You will receive a confirmation email
                  shortly.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Cancel
