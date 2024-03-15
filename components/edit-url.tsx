import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isValidUrl } from "@/lib/utils"
import { UrlsProps } from "@/app/(authorized)/home/page"

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
  }

  const onClick = async (): Promise<void> => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newData = urls.map((obj: any) =>
          obj.id === id ? Object.assign({}, obj, { ...obj, original_url: updatedUrl }) : obj,
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUrls(newData as any)
      }
    } catch (error) {
      console.error(error)
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit URL</DialogTitle>
          <DialogDescription>
            Make changes to your url here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button
            disabled={showError || updatedUrl === original_url}
            type="submit"
            onClick={onClick}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditUrl
