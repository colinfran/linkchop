"use client"
import React from "react"
import TopNavigation from "@/components/top-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SignInForm from "./sign-in-form"
import SignUpForm from "./sign-up-form"

const Auth: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <div className="size-full pt-[6rem]">
        <div className="flex flex-col items-center justify-center bg-background xl:h-[calc(100vh-4rem)] xl:flex-row xl:justify-center">
          <div className="mb-20 flex h-full justify-center xl:mb-0 xl:w-2/5">
            <Tabs className="w-full max-w-2xl xl:mt-16" defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignInForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
