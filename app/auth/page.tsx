"use client"
import React from "react"
import TopNavigation from "@/components/top-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SignInForm from "./sign-in-form"
import SignUpForm from "./sign-up-form"
import Footer from "@/components/footer"

const Auth: React.FC = () => {
  return (
    <>
      <TopNavigation />
      <div className="size-full space-y-6 py-6 md:h-screen xl:space-y-16">
        <div className="container md:space-y-2 md:p-12">
          <div className="flex flex-col items-center justify-center bg-background md:h-[calc(100vh-4rem)] xl:flex-row xl:justify-center">
            <div className="mb-20 flex h-full justify-center xl:mb-0 xl:w-2/5">
              <Tabs className="w-full max-w-2xl md:mt-16" defaultValue="signin">
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
      </div>
      <Footer />
    </>
  )
}

export default Auth
