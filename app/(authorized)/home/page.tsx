"use client"

import React, { useEffect, useState } from "react"
import { DataTable } from "./data-table"
import UrlMakerAuth from "@/components/url-maker-auth"
import { Input } from "@/components/ui/input"
import { XCircle } from "lucide-react"
import { useUser } from "@/components/providers/user-provider"

export type UrlsProps = {
  id: string
  original_url: string
  created_at: string
  visit_count?: number
}

const Page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [urls, setUrls] = useState<UrlsProps[] | undefined>(undefined)

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredUrls, setFilteredUrls] = useState<UrlsProps[]>([])

  const { data, status } = useUser()
  const isBanned = Boolean(data?.user?.data?.is_banned)

  useEffect(() => {
    if (status === "authenticated") {
      const getUrls = async (): Promise<void> => {
        try {
          setLoading(true)
          const response = await fetch("/api/urls/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: data?.user.data.id }),
          })
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error)
          }
          const urlsArr = await response.json()
          const val = urlsArr.sort(
            (a: UrlsProps, b: UrlsProps) => +new Date(b.created_at) - +new Date(a.created_at),
          )
          setUrls(val)
          setFilteredUrls(val)
        } catch (error) {
          console.error(error)
        }
        setLoading(false)
      }
      getUrls()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    setFilteredUrls(urls || [])
  }, [urls])

  const deleteUrl = async (id: string): Promise<void> => {
    try {
      const response = await fetch("/api/urls/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      const { success } = await response.json()
      if (success) {
        const filteredData = urls?.filter((item) => item.id !== id)
        setUrls(filteredData || [])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value
    setSearchQuery(query)

    // Filter data based on the search query
    const filtered = urls?.filter((item) =>
      item.original_url.toLowerCase().includes(query.toLowerCase()),
    )

    // Update filtered data state
    setFilteredUrls(filtered || [])
  }

  // Function to handle clearing the search input
  const clearSearch = (): void => {
    setSearchQuery("")
    setFilteredUrls(urls || [])
  }

  return (
    <>
      <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
        <div className="container space-y-2 p-5 sm:p-12 md:p-12">
          {isBanned ? (
            <div className="mx-auto mt-24 flex w-full max-w-3xl flex-col items-center justify-center space-y-4 rounded-lg border border-red-500/40 bg-red-500/5 p-8 text-center">
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight md:text-4xl">
                Account Restricted
              </h1>
              <p className="text-base text-muted-foreground">
                Your account was restricted because it violated our Terms of Service.
              </p>
              <p className="text-sm text-muted-foreground">
                You can no longer use LinkChop features, including creating new links.
              </p>
            </div>
          ) : (
            <>
              <div className="md:m-auto md:flex md:w-4/5">
                <UrlMakerAuth setUrls={setUrls} urls={urls} />
              </div>
              <div className="flex flex-col items-center justify-center space-y-5 text-white">
                <div className="w-full md:w-4/5">
                  {urls && urls?.length > 0 && (
                    <div className="mb-5 w-full md:w-1/2">
                      <div className="relative text-black dark:text-white">
                        <Input
                          placeholder="Filter URLs"
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                        />
                        <button
                          className="absolute right-0 top-0 mr-2 size-4 h-full text-black active:text-neutral-500 dark:text-white dark:active:text-neutral-800"
                          onClick={clearSearch}
                        >
                          <XCircle className="mr-2 size-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  {!urls ? (
                    <div />
                  ) : urls?.length === 0 ? (
                    <div className="-mt-20 flex justify-center">
                      <div className="w-5/6 md:w-4/5">
                        <h1 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                          Welcome to your dashboard!
                        </h1>
                        <h3 className="mt-4 scroll-m-20 text-lg font-semibold tracking-tight md:text-xl">
                          Start by creating your first shortened URL using the input field above and
                          clicking the &apos;Create URL&apos; button. Once you&apos;ve created a
                          link, a table will appear for easy access.
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <DataTable
                      data={filteredUrls}
                      deleteUrl={deleteUrl}
                      loading={loading}
                      setUrls={setUrls}
                      urls={urls || []}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Page
