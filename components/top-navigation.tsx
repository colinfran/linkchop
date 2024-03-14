"use client"
import React from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import logo from "@/assets/media/logo.webp"
import Link from "next/link"
import Image from "next/image"

const TopNavigation: React.FC = () => {
  return (
    <div className="flex size-full flex-col">
      <nav className="fixed start-0 top-0 z-20 w-full">
        <div className={"top-0 md:container md:m-auto md:max-w-[1400px]"}>
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 sm:px-12 md:m-auto md:w-4/5 md:px-0">
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
                <div className="hidden content-center justify-center md:block	">
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
                <div className="block md:hidden">
                  <Link href="/auth">
                    <Button variant="default">Sign Up / Sign In</Button>
                  </Link>
                </div>
              </div>
            </>
          </div>
        </div>
        <Separator />
      </nav>
      <div className="flex flex-col pb-[8px] pt-[72px] md:hidden	">
        <div className="flex content-center justify-center">
          <a href="/#features">
            <Button variant="link">Features</Button>
          </a>
          <a href="/#prices">
            <Button variant="link">Prices</Button>
          </a>
          <a href="/#contact">
            <Button variant="link">Contact</Button>
          </a>
        </div>
        <Separator />
      </div>
    </div>
  )
}

export default TopNavigation
