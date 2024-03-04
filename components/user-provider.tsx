"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

// Define the shape of your user object
// interface User {
//   id: string;
//   username: string;
//   // Add other relevant user information here
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type User = any

// Define the shape of your context
interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
}

// Create the context
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

// Define a custom hook to access the context
export const useUser = (): UserContextType => useContext(UserContext)

type Props = {
  children: React.ReactNode
}
// Define the provider component
export const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)

  // Fetch user data from your session or wherever you store it
  useEffect(() => {
    // You can implement logic here to fetch user data from session or localStorage
    // For the sake of simplicity, I'm leaving it empty
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
