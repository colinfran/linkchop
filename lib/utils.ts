"use client"
import { useState, useEffect } from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const isValidUrl = (str: string): boolean => {
  let givenURL
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    givenURL = new URL(str)
  } catch (error) {
    console.error(error)
    return false
  }
  return true
}

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 768) // Adjust the width as per your mobile breakpoint
    }
    // Initial check on mount
    handleResize()
    // Event listener for window resize
    window.addEventListener("resize", handleResize)
    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMessages: any = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
}
