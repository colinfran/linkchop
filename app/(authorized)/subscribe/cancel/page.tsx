"use client"
import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { useUser } from "@/components/providers/user-provider"
import { Icons } from "@/assets/icons"

const Page: React.FC = () => {
  const { user } = useUser()

  const [loading, setLoading] = useState(true)
  const [fetchLoading, setFetchLoading] = useState(false)
  const [text, setText] = useState("")
  const [successful, setSuccessful] = useState(null)

  useEffect(() => {
    if (user?.email) {
      if (!user?.is_premium_user) {
        redirect("/404")
      } else {
        setLoading(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const submitEmail = async (): Promise<void> => {
    try {
      setFetchLoading(true)
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          id: user.id,
          subject: "Unsubscribe request",
          type: "unsubscribe",
          reason: text,
        }),
      })
      const { success } = await response.json()
      if (!success) {
        // console.log("not successful")
      } else {
        setText("")
      }
      setSuccessful(success)
    } catch (error) {
      console.error(error)
    }
    setFetchLoading(false)
  }

  if (loading) return null

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
                  <Textarea
                    id="reason"
                    placeholder="Enter your reason for cancellation"
                    value={text}
                    required
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={fetchLoading}
                  type="submit"
                  onClick={async () => await submitEmail()}
                >
                  {fetchLoading ? <Icons.spinner className="mr-2 size-4 animate-spin" /> : "Submit"}
                </Button>
              </form>
              <div className="space-y-2">
                {successful === null && (
                  <div className="invisible">
                    <h2 className="text-2xl font-bold">Null</h2>
                    <p>Null</p>
                  </div>
                )}
                {successful === true && (
                  <div>
                    <h2 className="text-2xl font-bold">
                      A cancellation request has been requested.
                    </h2>
                    <p>
                      This request might take a few days to complete. Look out for a confirmation
                      email from colin@linkchop.com
                    </p>
                  </div>
                )}
                {successful === false && (
                  <div>
                    <h2 className="text-2xl font-bold">
                      There was an issue with the cancellation request
                    </h2>
                    <p>
                      An issue occurred while trying to cancel your subscription. The error message
                      has been sent to admins.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Page
