"use client"
import React from "react"
import { Analytics } from "@vercel/analytics/react"

const validAppRoutes = [
  "/",
  "/home",
  "/auth",
  "/auth/forgot-password",
  "/auth/password-reset",
  "/settings",
  "/settings/profile",
  "/settings/display",
  "/settings/subcription",
  "/settings/security",
  "/subscribe",
  "/subscribe/cancel",
  "/subscribe/return",
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
