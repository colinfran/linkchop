"use client"
import React, { useState, Suspense } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/assets/icons"
import { signIn } from "next-auth/react"
import PasswordEye from "@/components/password-eye"
import { errorMessages, useIsMobile } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const userLoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This is not a valid email." })
    .email("This is not a valid email."),
  password: z.string().min(1).max(32),
})

type UserLoginFormValues = z.infer<typeof userLoginFormSchema>

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const isMobile = useIsMobile()

  const [loading, setLoading] = useState(false)
  const params = useSearchParams()
  const formSignIn = useForm<UserLoginFormValues>({
    resolver: zodResolver(userLoginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const form = formSignIn
  const { watch, handleSubmit, formState } = form

  const formData = watch()

  const hasError = params.get("error")
  const [error, setError] = useState(hasError ? errorMessages[hasError] : "")

  const onSignIn = (): void => {
    const runSignIn = async (): Promise<void> => {
      try {
        setLoading(true)
        await signIn("credentials", {
          redirectTo: "/home",
          email: formData.email,
          password: formData.password,
        })
      } catch (e) {
        setLoading(false)
        console.error(e)
        setError("An error occured while trying to sign in.")
      }
    }
    runSignIn()
  }

  return (
    <Suspense>
      <Card className="">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <Form {...form}>
                <form className="space-y-8" onSubmit={handleSubmit(onSignIn)}>
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
                    <div>
                      <div className="relative flex w-full space-x-2">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem className={"w-full"}>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="abc123"
                                  {...field}
                                  className={isMobile ? "text-base" : ""}
                                  type={showPassword ? "text" : "password"}
                                />
                              </FormControl>
                              <Button
                                className="absolute bottom-[4px] right-[2px] !ml-0 h-[calc(2.5rem-8px)] w-12"
                                size="icon"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <PasswordEye showPassword={showPassword} />
                              </Button>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button
                        className="w-full"
                        disabled={
                          loading ||
                          Object.entries(formState.errors).length !== 0 ||
                          formData.password === "" ||
                          formData.password === ""
                        }
                        type="submit"
                      >
                        {loading ? (
                          <Icons.spinner className="mr-2 size-4 animate-spin" />
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
            <div>
              <div className={`mt-2.5 ${error ? "visible" : "invisible"}`}>
                <p className="text-sm font-medium text-destructive">
                  {error && <span>{error}</span>}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative mt-5 flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or login with</span>
                </div>
              </div>
              <Button className="mt-5 w-full" disabled={loading} type="button" variant="outline">
                <Icons.google className="mr-2 size-4" /> Google
              </Button>
              <Button className="mt-5 w-full" disabled={loading} type="button" variant="outline">
                <Icons.apple className="mr-2 size-4" /> Apple
              </Button>
            </div>
            <div className="mt-10 text-center">
              <Link href="/auth/forgot-password">Forgot Password</Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Suspense>
  )
}

export default SignInForm
