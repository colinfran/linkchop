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
  const [urls, setUrls] = useState<UrlsProps[] | []>([])

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredUrls, setFilteredUrls] = useState<UrlsProps[]>(urls)

  const { data, status } = useUser()

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
    setFilteredUrls(urls)
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
        const filteredData = urls.filter((item) => item.id !== id)
        setUrls(filteredData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value
    setSearchQuery(query)

    // Filter data based on the search query
    const filtered = urls.filter((item) =>
      item.original_url.toLowerCase().includes(query.toLowerCase()),
    )

    // Update filtered data state
    setFilteredUrls(filtered)
  }

  // Function to handle clearing the search input
  const clearSearch = (): void => {
    setSearchQuery("")
    setFilteredUrls(urls)
  }

  return (
    <>
      <div className="size-full space-y-6 py-6 md:min-h-[calc(100vh-72px+1.5rem)] xl:space-y-16">
        <div className="container space-y-2 p-5 sm:p-12 md:p-12">
          <div className="md:m-auto md:flex md:w-4/5">
            <UrlMakerAuth setUrls={setUrls} urls={urls} />
          </div>
          <div className="flex flex-col items-center justify-center space-y-5 text-white">
            <div className="w-full md:w-4/5">
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
              <DataTable
                data={filteredUrls}
                deleteUrl={deleteUrl}
                loading={loading}
                setUrls={setUrls}
                urls={urls}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
