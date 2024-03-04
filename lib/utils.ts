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
    console.log("error is", error)
    return false
  }
  return true
}
