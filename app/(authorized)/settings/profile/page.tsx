"use client"
import React, { useEffect, useState } from "react"

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
import { UserData } from "@/types/user"

const profileFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This is not a valid email." })
    .email("This is not a valid email."),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name can not be longer than 30 characters.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const Page: React.FC = () => {
  const { user, setUser } = useUser()
  const [loading, setLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
    },
  })

  const { handleSubmit, reset, watch } = form
  const formData = watch()

  useEffect(() => {
    if (user?.email) {
      reset({ email: user?.email, name: user?.name })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email])

  const onSubmit = async (): Promise<void> => {
    try {
      let values = {}
      let submissionForStr = ""
      if (formData.email !== user?.email && formData.name !== user?.name) {
        values = { ...user, newEmail: formData.email, name: formData.name }
        submissionForStr = "both the name and email address"
      } else if (formData.email !== user?.email) {
        submissionForStr = "the email address"
        values = { ...user, newEmail: formData.email }
      } else if (formData.name !== user?.name) {
        submissionForStr = "the name"
        values = { ...user, name: formData.name }
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
        setUser({ ...user, email: formData.email, name: formData.name } as UserData)
        toast({
          title: "Success",
          description: `You have successfully changed ${submissionForStr} associated with this account.`,
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
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update the email address and name associated with your account.
        </p>
      </div>
      <Separator />
      <div>
        <Form {...form}>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full md:w-52"
              disabled={
                loading ||
                ((formData.email === user?.email || formData.email === "") &&
                  (formData.name === user?.name || formData.name === ""))
              }
              type="submit"
            >
              {loading ? <Icons.spinner className="mr-2 size-4 animate-spin" /> : "Update profile"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default Page
