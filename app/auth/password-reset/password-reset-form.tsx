"use client"
import { Icons } from "@/assets/icons"
import PasswordEye from "@/components/password-eye"
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
import { toast } from "@/components/ui/use-toast"
import { useIsMobile } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import PasswordStrengthBar from "react-password-strength-bar"
import { z } from "zod"

const FormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "The password must be at least 8 characters long")
      .max(32, "The password must be a maximun 32 characters"),
    newPassword2: z
      .string()
      .min(8, "The password must be at least 8 characters long")
      .max(32, "The password must be a maximun 32 characters"),
  })
  .refine((data) => data.newPassword === data.newPassword2, {
    message: "The passwords do not match",
    path: ["newPassword2"],
  })

type FormValues = z.infer<typeof FormSchema>

const PasswordResetForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [successful, setSuccessful] = useState<null | boolean>(null)

  const [expiredToken, setExpiredToken] = useState(false)

  const isMobile = useIsMobile()

  const [passwordScore, setPasswordScore] = useState(0)

  const [showPassword2, setShowPassword2] = useState(false)
  const [showPassword3, setShowPassword3] = useState(false)

  const [count, setCount] = useState(6)

  const router = useRouter()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any
    if (successful && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [count, successful])

  useEffect(() => {
    const toastDescriptionElement = document.querySelector(".ToastDescription")
    if (toastDescriptionElement) {
      toastDescriptionElement.textContent = `You have successfully reset the password associated with this account. Redirecting you to the auth page in ${count > 1 ? `${count} seconds` : `${count} second`}.`
    }
    if (count === 0) {
      router.push("/auth")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  const searchParams = useSearchParams()

  const id = searchParams.get("id")
  const email = searchParams.get("email")

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      newPassword2: "",
    },
  })

  useEffect(() => {
    const checkId = async (): Promise<void> => {
      const response = await fetch("/api/auth/forgot-password/check-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
      const { message } = await response.json()
      if (message === "expired token") {
        setExpiredToken(true)
      }
    }
    if (!id) {
      router.push("/auth")
    } else {
      checkId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const { watch, handleSubmit } = form
  const formData = watch()

  const onSubmit = async (): Promise<void> => {
    try {
      const values = {
        email: email,
        newPassword: formData.newPassword,
      }
      setLoading(true)
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      const { success, errorMessage } = await response.json()
      if (success) {
        setSuccessful(true)
        toast({
          title: "Success",
          description: `You have successfully reset the password associated with this account. Redirecting you to the auth page in ${count > 1 ? `${count} seconds` : `${count} second`}.`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `There was a problem with your request: ${errorMessage}`,
        })
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
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
                  {expiredToken ? (
                    <div>Expired Token</div>
                  ) : (
                    <div>
                      <div>
                        <Form {...form}>
                          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                            <FormField
                              control={form.control}
                              name="newPassword"
                              render={({ field }) => (
                                <>
                                  <FormItem className={"relative w-full"}>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className={isMobile ? "text-base" : ""}
                                        type={showPassword2 ? "text" : "password"}
                                      />
                                    </FormControl>
                                    <Button
                                      className="absolute bottom-[4px] right-[2px] !ml-0 h-[calc(2.5rem-8px)] w-12"
                                      size="icon"
                                      type="button"
                                      onClick={() => setShowPassword2(!showPassword2)}
                                    >
                                      <PasswordEye showPassword={showPassword2} />
                                    </Button>
                                  </FormItem>
                                  <FormMessage />
                                </>
                              )}
                            />
                            <PasswordStrengthBar
                              className={`mt-2 ${formData.newPassword === "" && "invisible"}`}
                              password={formData.newPassword}
                              scoreWordStyle={
                                formData.newPassword === "" ? { visibility: "hidden" } : {}
                              }
                              onChangeScore={(s) => setPasswordScore(s)}
                            />

                            <FormField
                              control={form.control}
                              name="newPassword2"
                              render={({ field }) => (
                                <>
                                  <FormItem className={"relative w-full"}>
                                    <FormLabel>Verify Password</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        className={isMobile ? "text-base" : ""}
                                        type={showPassword3 ? "text" : "password"}
                                      />
                                    </FormControl>
                                    <Button
                                      className="absolute bottom-[4px] right-[2px] !ml-0 h-[calc(2.5rem-8px)] w-12"
                                      size="icon"
                                      type="button"
                                      onClick={() => setShowPassword3(!showPassword3)}
                                    >
                                      <PasswordEye showPassword={showPassword3} />
                                    </Button>
                                  </FormItem>
                                  <FormMessage />
                                </>
                              )}
                            />

                            <Button
                              className="w-full md:w-52"
                              disabled={
                                loading ||
                                passwordScore !== 4 ||
                                formData.newPassword === "" ||
                                formData.newPassword2 === "" ||
                                formData.newPassword !== formData.newPassword2
                              }
                              type="submit"
                            >
                              {loading ? (
                                <Icons.spinner className="mr-2 size-4 animate-spin" />
                              ) : (
                                "Update Password"
                              )}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PasswordResetForm
