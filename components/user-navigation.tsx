import React, { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Home, LineChart, LogOut, Settings, Unlock, XOctagon } from "lucide-react"
import { UserData } from "@/types/user"

const UserNavigation: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<UserData | null>(null)
  const { data } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserData(data?.user?.data as any)
  }, [data])

  const logoutUser = async (): Promise<void> => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="mr-3 w-auto md:mr-0 md:w-[150px]">
      <DropdownMenu>
        {userData?.name ? (
          <DropdownMenuTrigger>{userData?.name}</DropdownMenuTrigger>
        ) : (
          <Skeleton className="h-[30px] w-[150px] " />
        )}
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {userData?.name ? (
                <p className="text-sm font-medium leading-none">{userData?.name}</p>
              ) : (
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              )}
              <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/home">
            <DropdownMenuItem className="cursor-pointer">
              <Home className="mr-2 size-4" />
              Home
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer" disabled={!userData?.is_premium_user}>
            <LineChart className="mr-2 size-4" />
            <span className="w-full">Analytics</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {userData?.is_premium_user ? (
            <DropdownMenuItem className="cursor-pointer">
              <XOctagon className="mr-2 size-4" />
              Cancel Premium
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="cursor-pointer">
              <Unlock className="mr-2 size-4" />
              <span className="w-full">Unlock Premium</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <Link href="/settings/profile">
            <DropdownMenuItem className="cursor-pointer" disabled>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logoutUser}>
            <LogOut className="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserNavigation
