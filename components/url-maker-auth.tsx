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
// import { useSession } from "next-auth/react"
import { UrlsProps } from "@/app/home/page"
import { useIsMobile } from "@/lib/utils"
import { useUser } from "./user-provider"

const urlFormSchema = z.object({
  url: z.string().url().min(3, {
    message: "Url must be at least 3 characters.",
  }),
})

type urlFormValues = z.infer<typeof urlFormSchema>

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type UrlMakeAuthProp = {
  setUrls: (url: UrlsProps[]) => void
  urls: UrlsProps[]
}

const UrlMakeAuth: React.FC<UrlMakeAuthProp> = ({ setUrls, urls }: UrlMakeAuthProp) => {
  const { data } = useUser()
  const isMobile = useIsMobile()
  const [shortUrl, setShortUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showingCopiedText, setShowingCopiedText] = useState(false)

  const form = useForm<urlFormValues>({
    resolver: zodResolver(urlFormSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
    },
  })

  const { watch, handleSubmit, formState } = form
  const formData = watch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateUrl = (e: any): void => {
    const createUrl = async (): Promise<void> => {
      setLoading(true)
      try {
        const response = await fetch("/api/urls/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl: formData.url, userId: data?.user.data.id }),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error)
        }
        const { urlId } = await response.json()
        setShortUrl(urlId)
        const arr = [
          {
            id: urlId,
            original_url: formData.url,
            user_id: data?.user.data.id,
            created_at: new Date(),
          },
          ...urls,
        ]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUrls(arr as any)
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
    <section className="size-full py-12 pt-24 md:flex md:justify-center md:pt-32">
      <div className="w-full md:max-w-[600px]">
        <div className="flex w-full flex-col items-center justify-center text-center">
          <div className="mx-auto w-full space-y-2">
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
                                className={isMobile ? "text-base" : ""}
                              />
                              <Button
                                className="ml-5"
                                disabled={
                                  formData.url === "" ||
                                  formState.errors.url?.message === "Invalid url"
                                }
                                type="submit"
                                onClick={generateUrl}
                              >
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
          </div>
        </div>
        <div className={`relative ${shortUrl ? "visible" : "invisible"}`}>
          <div className="mt-10 flex flex-col items-center justify-center pb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Click the link below to copy</p>
            <CopyToClipboard text={`https://linkchop.com/${shortUrl}`}>
              <div
                className={`flex min-h-[42.46px] w-full justify-center rounded-md border border-gray-200 p-5 px-4 py-2 transition duration-300 md:w-1/2 ${showingCopiedText ? "!border-blue-500" : ""}`}
                onClick={showText}
              >
                {loading ? (
                  <div className="flex w-full items-center justify-center	">
                    <Icons.spinner className="size-3 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div
                      className={shortUrl ? "" : "invisible"}
                    >{`https://linkchop.com/${shortUrl}`}</div>
                    <div className={!shortUrl ? "invisible block" : "hidden"}>|</div>
                  </>
                )}
              </div>
            </CopyToClipboard>
          </div>
          {showingCopiedText && (
            <p className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              Copied
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default UrlMakeAuth
