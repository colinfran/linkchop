"use client"
import React from "react"
// import UserNav from "./user-nav"
import logo from "../assets/media/logo.webp"
import Link from "next/link"
import Image from "next/image"
import UserNavigation from "./user-navigation"
import { Separator } from "@/components/ui/separator"

const TopNavigationAuth: React.FC = () => {
  return (
    <div className="flex size-full">
      <nav className="fixed start-0 top-0 z-20 w-full">
        <div className={"top-0 size-full"}>
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <Link className="flex items-center space-x-3 rtl:space-x-reverse" href="/home">
              <Image
                alt="LinkChop Logo"
                className="size-[40px] h-10 invert-0 dark:invert"
                src={logo}
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                LinkChop
              </span>
            </Link>
            <>
              <div className="flex justify-center">
                <UserNavigation />
              </div>
            </>
          </div>
        </div>
      <Separator />
      </nav>
    </div>
  )
}

export default TopNavigationAuth
