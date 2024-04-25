"use client"
import { useEffect, useState } from "react"

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
