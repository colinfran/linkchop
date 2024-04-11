"use client"
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useSession } from "next-auth/react"
import TopNavigationAuth from "../top-navigation-auth"
import TopNavigation from "../top-navigation"
import Footer from "../footer"
import { Session } from "next-auth/types"
import { UserData } from "@/types/user"

interface UserContextType {
  data: Session | null
  status: "loading" | "authenticated" | "unauthenticated" | null
  update: () => void
  user: UserData | null
  setUser: Dispatch<SetStateAction<UserData | null>>
}

// Create the context
const UserContext = createContext<UserContextType>({
  data: null,
  status: null,
  update: () => {},
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
  const [user, setUser] = useState<UserData | null>(null)
  const [data, setData] = useState<Session | null>(null)
  const [status, setStatus] = useState<UserContextType["status"]>(null)

  const { data: sessionData, status: sessionStatus } = useSession()

  const getUserData = async (id: string): Promise<UserData[]> => {
    const response = await fetch("/api/user/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    return await response.json()
  }

  useEffect(() => {
    if (sessionData?.user) {
      setData(sessionData)
      const setUserData = async (): Promise<void> => {
        const userVal = await getUserData(sessionData?.user.data.id)
        setUser(userVal[0] as UserData)
      }
      setUserData()
    }
  }, [sessionData])

  const update = (): void => {
    const setUserData = async (): Promise<void> => {
      const userVal: UserData[] = await getUserData(sessionData?.user.data.id || "")
      setUser(userVal[0])
    }
    setUserData()
  }

  useEffect(() => {
    setStatus(sessionStatus)
  }, [sessionStatus])

  const TopNav: React.FC = () => {
    if (status === "loading" || status === null) {
      return <TopNavigationAuth />
    }
    if (status === "authenticated") {
      if (!data || !user) {
        return <TopNavigationAuth />
      }
      return <TopNavigationAuth />
    }
    return <TopNavigation />
  }

  return (
    <UserContext.Provider value={{ data, status, update, user, setUser }}>
      <>
        <TopNav />
        {children}
        <Footer />
      </>
    </UserContext.Provider>
  )
}
