"use client"
/* eslint-disable max-len */
import React from "react"
import TopNavigation from "@/components/top-navigation"
import Footer from "@/components/footer"
import Link from "next/link"

const Page404: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <div className="flex size-full pt-[72px] xl:space-y-16">
        <div className="flex size-full flex-col">
          <div className="flex min-h-[calc(100vh-72px+1.5rem)] flex-col items-center justify-center space-y-4 text-center">
            <div className="flex flex-row">
              <div className="mt-20 flex flex-row gap-5 text-center">
                <h1 className="mb-6 animate-bounce text-9xl font-bold">4</h1>
                <h1 className="mb-6 animate-bounce text-9xl font-bold">0</h1>
                <h1 className="mb-6 animate-bounce text-9xl font-bold">4</h1>
              </div>
            </div>
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Error
              </div>
              <h1 className="sm:text-5xl/line-through text-3xl font-bold tracking-tighter">
                Oops! You broke the internet.
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don&apos;t worry, you can still get back to safety. It&apos;s just a 404 error.
                Let&apos;s get you back to the{" "}
                <Link className="underline underline-offset-2" href="/">
                  homepage
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page404
