"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

const urlFormSchema = z.object({
  url: z.string().url().min(3, {
    message: "Url must be at least 3 characters.",
  }),
})

type urlFormValues = z.infer<typeof urlFormSchema>

const UrlMaker = () => {
  const [shortUrl, setShortUrl] = useState("")

  const form = useForm<urlFormValues>({
    resolver: zodResolver(urlFormSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
    },
  })

  const { watch, handleSubmit } = form

  const generateUrl = (e: any): void => {
    e.preventDefault()
    //  if ()
    // geerate new url
    const formData = watch()
    setShortUrl(formData.url)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container flex flex-col items-center justify-center space-y-4 px-4 text-center md:px-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            LinkChop. The URL shortener for everyone.
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Shorten, share, and track your links with ease. Perfect for social media, email
            campaigns, and more.
          </p>
        </div>
        <div className="mx-auto space-y-2 sm:w-[375px] md:w-[600px]">
          <Form {...form}>
            <form className="space-y-8" onSubmit={handleSubmit(generateUrl)}>
              <div>
                <div>
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex">
                            <Input
                              placeholder="https://google.com/test/asdf/wer/asdf/asdf"
                              type="text"
                              {...field}
                            />
                            <Button className="ml-5" type="submit" onClick={generateUrl}>
                              Create
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign up to keep track of your generated URLs.
          </p>
        </div>
      </div>
      <div>
        <div className="mt-10 flex justify-center">
          <div className="flex w-[350px] border border-gray-200 p-5 dark:border-gray-800">
            <div className={shortUrl ? "" : "invisible"}>{shortUrl}</div>
            <div className={!shortUrl ? "invisible block" : "hidden"}>|</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UrlMaker
