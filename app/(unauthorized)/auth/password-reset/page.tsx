"use client"
import React, { Suspense } from "react"
import PasswordResetForm from "./password-reset-form"

const Page: React.FC = () => {
  return (
    <Suspense>
      <PasswordResetForm />
    </Suspense>
  )
}
export default Page
