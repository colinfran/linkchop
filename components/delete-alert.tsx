import React, { Dispatch, SetStateAction } from "react"
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

type DeleteAlertProps = {
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
  id: string
  deleteUrl: (id: string) => Promise<void>
  setSelectedItemId: Dispatch<SetStateAction<string>>
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  setIsOpen,
  isOpen,
  id,
  deleteUrl,
  setSelectedItemId,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this url from our servers.
            Click Continue to continue with deletion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(!isOpen)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteUrl(id)
              setIsOpen(!isOpen)
              setSelectedItemId("")
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
