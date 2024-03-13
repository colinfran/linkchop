"use client"
import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { useUser } from "@/components/user-provider"
import { useRouter } from "next/navigation"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Subscribe: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("")
  const { user, status } = useUser()
  const router = useRouter()

  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (user?.email) {
      if (status === "authenticated" && user?.is_premium_user) {
        router.push("/subscribe/cancel")
      }
      setReady(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    const fetchSession = async (): Promise<void> => {
      try {
        const response = await fetch("/api/checkout/create", {
          method: "POST",
          body: JSON.stringify({ email: user.email }),
        })
        const val = await response.json()
        setClientSecret(val.clientSecret)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    if (ready) {
      fetchSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  if (!user?.email || !clientSecret || !ready) {
    return (
      <>
        <div></div>
      </>
    )
  }

  return (
    <>
      <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
        <div className="container mt-[10%] space-y-2 p-5 sm:p-12 md:mt-5  md:p-12">
          <Card className="bg-white p-5 md:min-h-[1079px] md:p-20">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-black">Subscribe</h1>
              <p className="text-gray-500 ">
                We&apos;re sorry to see you go. Please fill out the form below to cancel your
                subscription.
              </p>
            </div>
            <div className="w-full space-y-4">
              <div id="checkout">
                {clientSecret && user?.email && (
                  <EmbeddedCheckoutProvider options={{ clientSecret }} stripe={stripePromise}>
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Subscribe
