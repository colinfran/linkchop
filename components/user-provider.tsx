/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

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
  data: User | null
  status: User | null
  update: () => void
  user: User | null
}

// Create the context
const UserContext = createContext<UserContextType>({
  data: null,
  status: null,
  update: () => {},
  user: null,
})

// Define a custom hook to access the context
export const useUser = (): UserContextType => useContext(UserContext)

type Props = {
  children: React.ReactNode
}
// Define the provider component
export const UserProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(null)

  const { data: sessionData, status: sessionStatus } = useSession()

  const getUserData = async (email: string): Promise<any> => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    return await response.json()
  }

  useEffect(() => {
    if (sessionData?.user.data.email) {
      setData(sessionData as any)
      const setUserData = async (): Promise<void> => {
        const userVal = await getUserData(sessionData?.user.data.email)
        setUser(userVal[0])
      }
      setUserData()
    }
  }, [sessionData])

  const update = (): void => {
    const setUserData = async (): Promise<void> => {
      const userVal = await getUserData(sessionData?.user.data.email || "")
      // console.log(userVal)
      setUser(userVal[0])
    }
    setUserData()
  }

  useEffect(() => {
    setStatus(sessionStatus as any)
  }, [sessionStatus])

  return (
    <UserContext.Provider value={{ data, status, update, user }}>{children}</UserContext.Provider>
  )
}
