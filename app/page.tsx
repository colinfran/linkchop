/* eslint-disable max-len */
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import UrlMaker from "@/components/url-maker"
import TopNavigation from "@/components/top-navigation"

const HomePage: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <div className="size-full pt-[72px] xl:space-y-16">
        <div className="flex min-h-[100dvh] flex-col">
          <main className="flex-1">
            <UrlMaker />
            <Separator />
            <section className="w-full py-12 md:py-24 lg:py-32" id="features">
              <div className="container space-y-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                      Free Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Shorten. Share.
                    </h2>
                    <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      The easiest way to share links. Turn long, complex URLs into short, simple
                      links with a click. Share them across the web, track clicks, and know your
                      audience.
                    </p>
                  </div>
                  <div className="grid max-w-sm gap-2 text-left sm:max-w-none">
                    <ul className="grid gap-2 py-4">
                      <li>
                        <svg
                          className="mr-2 inline-block size-4"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Simple, short, auto-generated unique urls.
                      </li>
                      <li>
                        <svg
                          className="mr-2 inline-block size-4"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Track basic link performance.
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="mx-auto max-w-[calc(100vw-32px)]"></div> */}
                <Separator className="m-auto mt-2 w-[60%]" />
                <div className="space-y-12">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                      <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                        Paid Features
                      </div>
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Unlock advanced features
                      </h2>
                      <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Upgrade to premium and get more out of your links with advanced features
                        like retargeting, UTM tracking, and custom scripts.
                      </p>
                    </div>
                    <ul className="grid gap-2 py-4">
                      <li>
                        <svg
                          className="mr-2 inline-block size-4"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Add retargeting pixels to your links for better ad targeting.
                      </li>
                      <li>
                        <svg
                          className="mr-2 inline-block size-4"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Track link performance with UTM parameters and Google Analytics integration.
                      </li>
                      <li>
                        <svg
                          className="mr-2 inline-block size-4"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Add custom scripts to your short URLs for more interactivity.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <Separator />
            <section className="w-full py-12 md:py-24 lg:py-32" id="prices">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Simple Pricing
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Choose the plan that's right for you. All plans come with unlimited links and
                      clicks.
                    </p>
                  </div>
                </div>
                <div className="mx-auto grid max-w-3xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <div className="flex flex-col space-y-1.5 bg-gray-50 p-4 px-12 dark:bg-gray-950">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                          Free
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">For personal use</p>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-4 p-4">
                        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight">
                          $0.00
                        </h1>
                        <div className="text-3xl font-bold">Limited</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Includes basic features
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <div className="flex flex-col space-y-1.5 bg-gray-50 p-4 px-12 dark:bg-gray-950">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                          Premium
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">For power users</p>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-4 p-4">
                        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight">
                          $5.00 <span className="text-xl">/</span>
                          <span className="ml-2 text-xl">month</span>
                        </h1>
                        <div className="text-3xl font-bold">Unlimited</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Includes all features
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Advancned Analytics &amp; Tracking
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Custom Short Links
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            <Separator />
            <section className="w-full py-6 md:py-12" id="contact">
              <div className="container flex flex-col gap-4 px-4 text-center md:flex-row md:items-center md:justify-center md:gap-6 lg:gap-10 xl:gap-12">
                <div className="space-y-3 md:text-left">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Get in touch
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We&apos;re here to help. Contact us with any questions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:gap-4 lg:gap-2">
                  <a href="mailto:test@test.com">
                    <Button>
                      <svg
                        className="size-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect height="16" rx="2" width="20" x="2" y="4"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      Email
                    </Button>
                  </a>
                  <a href="https://twitter.com/colinfran">
                    <Button
                      // className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      Twitter
                    </Button>
                  </a>
                  <a href="https://github.com/colinfran">
                    <Button
                      // className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                      GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default HomePage
