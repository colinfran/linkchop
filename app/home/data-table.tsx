"use client"
import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DeleteAlert from "@/components/delete-alert"
import { Icons } from "@/assets/icons"
import EditUrl from "@/components/edit-url"
import { UrlsProps } from "./page"

type DataTableProps = {
  data: UrlsProps[]
  deleteUrl: (id: string) => Promise<void>
  loading: boolean
  setUrls: (urls: UrlsProps[]) => void
  urls: UrlsProps[]
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  deleteUrl,
  loading,
  setUrls,
  urls,
}: DataTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)

  const [selectedItemId, setSelectedItemId] = useState<string>("")
  const [editedUrlString, setEditedUrlString] = useState<string>("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Calculate the start and end indices of the current page
  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + itemsPerPage - 1, data.length)

  // Handler for navigating to the previous page
  const goToPreviousPage = (): void => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  // Handler for navigating to the next page
  const goToNextPage = (): void => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage)))
  }

  return (
    <div className="">
      <div className="min-h-[818.5px] rounded-md border">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Chopped URL</TableHead>
              <TableHead>Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black dark:text-white">
            {true ? (
              <TableRow className="h-[400px] md:h-[700px]">
                <TableCell className="h-24" colSpan={4}>
                  <div className="flex items-center justify-center">
                    <Icons.spinner className="size-16 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data.length ? (
                  data.slice(startIndex - 1, endIndex).map((url) => (
                    <TableRow className="h-[80px]" key={url.id}>
                      <TableCell className="h-24">
                        <div className="flex">{url.original_url}</div>
                      </TableCell>
                      <TableCell className="h-24">
                        <div className="flex">{`https://linkchop.com/${url.id}`}</div>
                      </TableCell>
                      <TableCell className="h-24">
                        <div className="flex">{`Created on ${format(new Date(url.created_at), "Pp")}`}</div>
                      </TableCell>
                      <TableCell className="h-24">
                        <>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button className="size-8 p-0" variant="ghost">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedItemId(url.id)
                                  setEditedUrlString(url.original_url)
                                  console.log(url.original_url)
                                  setIsEditOpen(!isEditOpen)
                                }}
                              >
                                <Pencil className="mr-2 size-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedItemId(url.id)
                                  setIsDeleteOpen(!isDeleteOpen)
                                }}
                              >
                                <Trash2 className="mr-2 size-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="h-24" colSpan={4}>
                      <div className="flex items-center justify-center">No results.</div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        className={`flex items-center justify-end space-x-2 py-4 text-black dark:text-white ${data.length === urls.length ? "visible" : "invisible"}`}
      >
        {!loading && (
          <div className="flex-1 text-sm text-muted-foreground">
            {data.length && `Showing ${startIndex} to ${endIndex} of ${data.length} entries`}
          </div>
        )}
        <div className={"space-x-2"}>
          <Button
            disabled={startIndex === 1}
            size="sm"
            variant="outline"
            onClick={goToPreviousPage}
          >
            Previous
          </Button>
          <Button
            disabled={endIndex === urls.length}
            size="sm"
            variant="outline"
            onClick={goToNextPage}
          >
            Next
          </Button>
        </div>
      </div>
      <DeleteAlert
        deleteUrl={deleteUrl}
        id={selectedItemId || ""}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        setSelectedItemId={setSelectedItemId}
      />
      <EditUrl
        id={selectedItemId || ""}
        isOpen={isEditOpen}
        original_url={editedUrlString || ""}
        setIsOpen={setIsEditOpen}
        setUrls={setUrls}
        urls={urls}
      />
    </div>
  )
}
