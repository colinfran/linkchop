import React, { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isValidUrl } from "@/lib/utils"
import { UrlsProps } from "@/app/(authorized)/home/page"
import { Icons } from "@/assets/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { toast } from "./ui/use-toast"

type EditUrlProps = {
  original_url: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  id: string
  urls: UrlsProps[]
  setUrls: (url: UrlsProps[]) => void
}

const EditUrl: React.FC<EditUrlProps> = ({
  original_url,
  isOpen,
  setIsOpen,
  id,
  urls,
  setUrls,
}: EditUrlProps) => {
  const [loading, setloading] = useState(false)
  const [updatedUrl, setUpdatedUrl] = useState("")
  const [showError, setShowError] = useState(false)
  useEffect(() => {
    setUpdatedUrl(original_url)
  }, [original_url])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setUpdatedUrl(value)
    if (isValidUrl(value)) {
      setShowError(false)
    } else {
      setShowError(true)
    }
    console.log("here", value, isValidUrl(value))
  }

  const onClick = async (): Promise<void> => {
    setloading(true)
    try {
      const response = await fetch("/api/urls/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, newUrl: updatedUrl }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      const { success } = await response.json()
      if (success) {
        const newData = urls.map((obj: UrlsProps) =>
          obj.id === id ? Object.assign({}, obj, { ...obj, original_url: updatedUrl }) : obj,
        )
        setUrls(newData)
        setIsOpen(false)
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      })
    } finally {
      setloading(false)
    }
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit URL</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your url here. Click save when you&apos;re done.
          </AlertDialogDescription>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="url">
                Original URL
              </Label>
              <Input className="col-span-3" id="url" value={updatedUrl} onChange={onChange} />
            </div>
            <div className={`text-center text-red-600 ${showError ? "visible" : "invisible"}`}>
              Invalid Url
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(!isOpen)}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={!isValidUrl(updatedUrl)} onClick={onClick}>
            {loading ? <Icons.spinner className="mr-2 size-4 animate-spin" /> : "Save"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditUrl
