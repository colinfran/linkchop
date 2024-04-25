import React, { Dispatch, SetStateAction, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Icons } from "@/assets/icons"

type DeleteUrlProps = {
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
  id: string
  deleteUrl: (id: string) => Promise<void>
  setSelectedItemId: Dispatch<SetStateAction<string>>
}

const DeleteUrl: React.FC<DeleteUrlProps> = ({
  setIsOpen,
  isOpen,
  id,
  deleteUrl,
  setSelectedItemId,
}) => {
  const [loading, setloading] = useState(false)
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this url from our servers.
            Click Delete to continue with deletion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(!isOpen)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              setloading(true)
              await deleteUrl(id)
              setloading(false)
              setIsOpen(!isOpen)
              setSelectedItemId("")
            }}
          >
            {loading ? <Icons.spinner className="mr-2 size-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteUrl
