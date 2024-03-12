/* eslint-disable @typescript-eslint/no-explicit-any */
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
import TopNavigationAuth from "./top-navigation-auth"
import TopNavigation from "./top-navigation"
import Footer from "./footer"

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
  setUser: Dispatch<SetStateAction<null>>
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
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(null)

  const { data: sessionData, status: sessionStatus } = useSession()

  const getUserData = async (id: string): Promise<any> => {
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
    if (sessionData?.user.data.id) {
      // console.log(sessionData)
      setData(sessionData as any)
      const setUserData = async (): Promise<void> => {
        const userVal = await getUserData(sessionData?.user.data.id)
        setUser(userVal[0])
      }
      setUserData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData?.user.data.id])

  const update = (): void => {
    const setUserData = async (): Promise<void> => {
      const userVal = await getUserData(sessionData?.user.data.id || "")
      // console.log(userVal)
      setUser(userVal[0])
    }
    setUserData()
  }

  useEffect(() => {
    setStatus(sessionStatus as any)
  }, [sessionStatus])

  const TopNav: React.FC = () => {
    // console.log(status)
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
