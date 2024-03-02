import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { useAuth } from "@/Contexts/AuthContext"

const UserNavigation: React.FC = () => {
  const { data } = useSession()
  const router = useRouter()

  const logoutUser = async (): Promise<void> => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="mr-3 w-auto md:mr-0 md:w-[150px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative size-8 rounded-full" variant="ghost">
            <Avatar className="size-12">
              <AvatarImage alt="@shadcn" src="/avatars/01.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{data?.user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{data?.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {data && (
              <>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <Link href="/settings/profile">
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logoutUser}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserNavigation
