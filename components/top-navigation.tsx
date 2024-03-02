"use client"
import React, { useState, ReactElement } from "react"
import { Separator } from "./ui/separator"
// import UserNav from "./user-nav"
import { Button } from "./ui/button"
import logo from "../assets/media/logo.webp"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import UserNavigation from "./user-navigation"

const TopNavigation: React.FC = () => {
  return (
    <div className="">
      <nav className="dark:border-gray-60 fixed start-0 top-0 z-20 w-full border-b border-gray-200">
        <div className={"top-0 size-full"}>
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <Link className="flex items-center space-x-3 rtl:space-x-reverse" href="/">
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
              <div className="flex">
                <div className="flex hidden content-center justify-center md:block	">
                  <>
                    <a href="/#features">
                      <Button variant="link">Features</Button>
                    </a>
                    <a href="/#prices">
                      <Button variant="link">Prices</Button>
                    </a>
                    <a href="/#contact">
                      <Button variant="link">Contact</Button>
                    </a>
                  </>

                  <Link href="/auth">
                    <Button variant="default">Sign Up / Sign In</Button>
                  </Link>
                </div>
              </div>
            </>
          </div>
        </div>
      </nav>
      <div className="block flex content-center justify-center pb-[8px] pt-[72px] pt-[80px] md:hidden	">
        <>
          <a href="#features">
            <Button variant="link">Features</Button>
          </a>
          <a href="#prices">
            <Button variant="link">Prices</Button>
          </a>
          <a href="#contact">
            <Button variant="link">Contact</Button>
          </a>
        </>
        <Link href="/auth">
          <Button variant="default">Sign Up / Sign In</Button>
        </Link>
      </div>
      <Separator />
    </div>
  )
}

export default TopNavigation
