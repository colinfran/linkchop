/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Icons } from "@/assets/icons"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useIsMobile } from "@/lib/utils"

const urlFormSchema = z.object({
  url: z.string().url().min(3, {
    message: "Url must be at least 3 characters.",
  }),
})

type urlFormValues = z.infer<typeof urlFormSchema>

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const UrlMaker: React.FC = () => {
  const [shortUrl, setShortUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showingCopiedText, setShowingCopiedText] = useState(false)
  const isMobile = useIsMobile()

  const form = useForm<urlFormValues>({
    resolver: zodResolver(urlFormSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
    },
  })

  const { watch, handleSubmit } = form

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateUrl = (e: any): void => {
    const createUrl = async (): Promise<void> => {
      setLoading(true)
      const formData = watch()
      try {
        const response = await fetch("/api/urls/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl: formData.url }),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error)
        }
        const { urlId } = await response.json()
        setShortUrl(urlId)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    e.preventDefault()
    createUrl()
  }

  const showText = async (): Promise<void> => {
    setShowingCopiedText(true)
    await sleep(1000)
    setShowingCopiedText(false)
  }

  return (
    <section className="size-full py-12 md:py-24 lg:py-32 xl:py-48">
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
                              className={isMobile ? "text-base" : ""}
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
      <div className={`relative ${shortUrl ? "visible" : "invisible"}`}>
        <div className="mt-10 flex flex-col items-center justify-center pb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">Click the link below to copy</p>
          <CopyToClipboard text={`https://linkchop.com/${shortUrl}`}>
            <div
              className={`flex min-h-[42.46px] w-[350px] justify-center rounded-md border border-gray-200 p-5 px-4 py-2 transition duration-300 ${showingCopiedText ? "!border-blue-500" : ""}`}
              onClick={showText}
            >
              {loading ? (
                <div className="flex w-full items-center justify-center	">
                  <Icons.spinner className="size-3 animate-spin" />
                </div>
              ) : (
                <>
                  <div>{`https://linkchop.com/${shortUrl}`}</div>
                </>
              )}
            </div>
          </CopyToClipboard>
        </div>
        {showingCopiedText && (
          <p className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">Copied</p>
        )}
      </div>
    </section>
  )
}

export default UrlMaker
