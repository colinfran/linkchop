"use client"
import { Icons } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const userLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This is not a valid email." })
    .email("This is not a valid email."),
})

type UserEmailFormValues = z.infer<typeof userLoginFormSchema>

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState(null)
  const isMobile = useIsMobile()

  const form = useForm<UserEmailFormValues>({
    resolver: zodResolver(userLoginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  })

  const { watch, handleSubmit } = form
  const formData = watch()

  const submitEmail = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          subject: "Forgot Password.",
          type: "forgot-password",
        }),
      })
      const { success } = await response.json()
      setSuccessful(success)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
        <div className="px-8 md:container md:space-y-2 md:p-12">
          <div className="flex flex-col items-center justify-center bg-background xl:flex-row xl:justify-center">
            <div className="mb-20 flex h-full justify-center xl:mb-0 ">
              <Card className="mt-20">
                <CardHeader>
                  <CardTitle>Forgot Password</CardTitle>
                  <CardDescription>
                    Enter your email and we will send you a link to reset your password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div>
                      <Form {...form}>
                        <form className="space-y-8" onSubmit={handleSubmit(submitEmail)}>
                          <div>
                            <div>
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="hello@test.com"
                                        {...field}
                                        className={isMobile ? "text-base" : ""}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="mt-8">
                              <Button
                                className="w-full"
                                disabled={formData.email === ""}
                                type="submit"
                              >
                                {loading ? (
                                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                                ) : (
                                  "Submit"
                                )}
                              </Button>
                            </div>
                          </div>
                        </form>
                      </Form>
                    </div>
                    <div>
                      <div className="space-y-2">
                        {successful === null && (
                          <div className="invisible">
                            <h2 className="text-2xl font-bold">Null</h2>
                            <p>asdfasdfasdfasdf asdf asd fasdf asdfasd fasd fasdf asf as f asdf</p>
                          </div>
                        )}
                        {successful === true && (
                          <div>
                            <h2 className="text-2xl font-bold">
                              A password reset request has been sent.
                            </h2>
                            <p>
                              Please check your inbox for this email. It will provide a link that
                              will allow you to reset your password.
                            </p>
                          </div>
                        )}
                        {successful === false && (
                          <div>
                            <h2 className="text-2xl font-bold">
                              There was an issue with the password reset request.
                            </h2>
                            <p>
                              Please reach out to colin@linkchop.com for help if this continues to
                              occur.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
