"use client"
import React from "react"
import { Analytics } from "@vercel/analytics/react"

const validAppRoutes = [
  "/",
  "/home",
  "/auth",
  "/settings",
  "/settings/profile",
  "/settings/display",
  "/settings/notifications",
  "/settings/account",
  "/privacy",
  "/terms",
  "/404",
]

export const VercelAnalytics: React.FC = () => {
  return (
    <Analytics
      beforeSend={(event) => {
        if (!validAppRoutes.includes(new URL(event.url).pathname)) {
          return null
        }
        return event
      }}
    />
  )
}
