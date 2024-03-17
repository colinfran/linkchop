"use client"
import React, { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { useUser } from "@/components/providers/user-provider"

const Page: React.FC = () => {
  const { user, update } = useUser()
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const getSessionId = async (): Promise<void> => {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const sessionId = urlParams.get("session_id")
      if (!sessionId) {
        return redirect("/404")
      }
      const response = await fetch("/api/checkout/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          sessionId,
        }),
      })
      const val = await response.json()
      setStatus(val.status)
    }
    if (user?.email) {
      getSessionId()
    }
  }, [user?.email])

  useEffect(() => {
    const sendEmail = async (): Promise<void> => {
      try {
        await fetch("/api/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user?.name,
            email: user?.email,
            subject: "Thank you for purchasing the premium subscription!",
            type: "subscribe",
          }),
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (status === "complete") {
      update()
      sendEmail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete") {
    return (
      <>
        <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
          <div className="container mt-[5%] space-y-2 p-5 sm:p-12 md:mt-[8%] md:p-12">
            <Card className="p-20">
              <section id="success">
                <p>
                  We appreciate your business! A confirmation email will be sent to {user?.email}.
                  If you have any questions, please email{" "}
                  <a href="mailto:colin@linkchop.com">colin@linkchop.com</a>.
                </p>
              </section>
            </Card>
          </div>
        </div>
      </>
    )
  }
}

export default Page
