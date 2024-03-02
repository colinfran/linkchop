"use client"
import React from "react"
// import UserNav from "./user-nav"
import logo from "../assets/logo-white.webp"
import Link from "next/link"
import Image from "next/image"
import UserNavigation from "./user-navigation"

const TopNavigationAuth: React.FC = () => {
  return (
    <div className="">
      <nav className="dark:border-gray-60 fixed start-0 top-0 z-20 w-full border-b border-gray-200">
        <div className={"top-0 size-full"}>
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <Link className="flex items-center space-x-3 rtl:space-x-reverse" href="/home">
              <Image
                alt="LinkSnip Logo"
                className="size-[40px] h-10 invert dark:invert-0"
                src={logo}
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                LinkSnip
              </span>
            </Link>
            <>
              <div className="flex justify-center">
                <UserNavigation />
              </div>
            </>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default TopNavigationAuth
