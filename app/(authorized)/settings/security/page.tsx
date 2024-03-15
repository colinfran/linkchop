"use client"
import React, { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useUser } from "@/components/providers/user-provider"
import { Icons } from "@/assets/icons"
import { toast } from "@/components/ui/use-toast"
import PasswordStrengthBar from "react-password-strength-bar"
import PasswordEye from "@/components/password-eye"
import { useIsMobile } from "@/lib/utils"

const securityFormSchema = z
  .object({
    oldPassword: z.string(),
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
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "The new password must be different from the old password",
    path: ["newPassword"],
  })

type SecurityFormValues = z.infer<typeof securityFormSchema>

const Page: React.FC = () => {
  const { user, setUser } = useUser()
  const [loading, setLoading] = useState(false)
  const [passwordScore, setPasswordScore] = useState(0)
  const isMobile = useIsMobile()

  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [showPassword3, setShowPassword3] = useState(false)

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    },
  })

  const { handleSubmit, watch } = form
  const formData = watch()

  const onSubmit = async (): Promise<void> => {
    try {
      const values = {
        ...user,
        newPassword: formData.newPassword,
        oldPassword: formData.oldPassword,
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
        setUser({ ...user, password: formData.newPassword })
        toast({
          title: "Success",
          description: "You have successfully changed the password associated with this account.",
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Update the password associated with your account.
        </p>
      </div>
      <Separator />
      <div>
        <Form {...form}>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <>
                  <FormItem className={"relative w-full"}>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={isMobile ? "text-base" : ""}
                        type={showPassword1 ? "text" : "password"}
                      />
                    </FormControl>
                    <Button
                      className="absolute bottom-[4px] right-[2px] !ml-0 h-[calc(2.5rem-8px)] w-12"
                      size="icon"
                      type="button"
                      onClick={() => setShowPassword1(!showPassword1)}
                    >
                      <PasswordEye showPassword={showPassword1} />
                    </Button>
                  </FormItem>
                  <FormMessage />
                </>
              )}
            />

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
              scoreWordStyle={formData.newPassword === "" ? { visibility: "hidden" } : {}}
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
                formData.oldPassword === "" ||
                formData.newPassword !== formData.newPassword2
              }
              type="submit"
            >
              {loading ? <Icons.spinner className="mr-2 size-4 animate-spin" /> : "Update Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default Page
