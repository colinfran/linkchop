"use client"
import React, { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import TopNavigationAuth from "@/components/top-navigation-auth"
import Footer from "@/components/footer"
import { useUser } from "@/components/user-provider"

const Return: React.FC = () => {
  const { user, update } = useUser()
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (user?.email) {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const sessionId = urlParams.get("session_id")

      fetch(`/api/get_checkout_session?session_id=${sessionId}&email=${user.email}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((val) => {
          setStatus(val.status)
        })
    }
  }, [user?.email])

  useEffect(() => {
    if (status === "complete") {
      update()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete") {
    return (
      <>
        <TopNavigationAuth />
        <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
          <div className="container mt-[5%] space-y-2 p-5 sm:p-12 md:mt-[8%] md:p-12">
            <Card className="p-20">
              <section id="success">
                <p>
                  We appreciate your business! A confirmation email will be sent to {user.email}. If
                  you have any questions, please email{" "}
                  <a href="mailto:support@linkchop.com">support@linkchop.com</a>.
                </p>
              </section>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return null
}

export default Return
