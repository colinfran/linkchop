"use client"

import React, { useEffect, useState } from "react"
import TopNavigationAuth from "@/components/top-navigation-auth"
import { DataTable } from "./data-table"
import UrlMakerAuth from "@/components/url-maker-auth"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { XCircle } from "lucide-react"

export type UrlsProps = {
  id: string
  original_url: string
  created_at: string
}

const HomeAuthenticatedPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [urls, setUrls] = useState<UrlsProps[] | []>([])

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredUrls, setFilteredUrls] = useState<UrlsProps[]>(urls)

  const { data, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      const getUrls = async (): Promise<void> => {
        try {
          setLoading(true)
          console.log(data)
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
          console.log(urlsArr)
          const val = urlsArr.sort(
            (a: UrlsProps, b: UrlsProps) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (new Date(b.created_at) as any) - (new Date(a.created_at) as any),
          )
          setUrls(val)
          setFilteredUrls(val)
        } catch (error) {
          console.log(error)
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
      console.log(data)
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
        console.log("successful")
        const filteredData = urls.filter((item) => item.id !== id)
        console.log(filteredData)
        setUrls(filteredData)
      }
    } catch (error) {
      console.log(error)
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
      <TopNavigationAuth />
      <div className="size-full space-y-6 py-6 xl:space-y-16">
        <div className="container space-y-2 p-12">
          <div>
            <UrlMakerAuth setUrls={setUrls} urls={urls} />
          </div>
          <div className="flex flex-col items-center justify-center space-y-5 text-white">
            <div className="w-4/5">
              <div className="mb-5 w-full md:w-1/2">
                <div className="relative text-black dark:text-white">
                  <Input
                    placeholder="Filter URLs"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <button
                    className="absolute right-0 top-0 mr-2 size-4 h-full text-black dark:text-white"
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

export default HomeAuthenticatedPage
