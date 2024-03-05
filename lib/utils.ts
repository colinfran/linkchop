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
