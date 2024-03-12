"use client"
import React, { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SignInForm from "./sign-in-form"
import SignUpForm from "./sign-up-form"

const Auth: React.FC = () => {
  return (
    <>
      <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
        <div className="px-8 md:container md:space-y-2 md:p-12">
          <div className="flex flex-col items-center justify-center bg-background xl:flex-row xl:justify-center">
            <div className="mb-20 flex h-full justify-center xl:mb-0 ">
              <Tabs className="w-full max-w-2xl md:mt-16" defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <Suspense>
                    <SignInForm />
                  </Suspense>
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
