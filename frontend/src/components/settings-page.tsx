import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import {useRecoilValue} from "recoil";
import {userDataAtom} from "../store/store.ts";
// import  {deleteAccount} from "../functions/auth.ts"
import  {deleteAccount} from "../functions/auth.ts";

export function SettingsPageComponent() {
  const userData = useRecoilValue(userDataAtom)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    const api = await deleteAccount({userToken: localStorage.getItem("Authorization")})
    if(api.data.success === true) {
      setIsDeleting(false)
      alert(api.data.message)
    } else {
      setIsDeleting(false)
      alert(api.data.message)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <p className="text-muted-foreground mb-8">View your account information and manage your account.</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="user-id">User ID</Label>
          <Input id="user-id" value={userData.id || ''} readOnly className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={userData.name} readOnly className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={userData.email} readOnly className="bg-muted" />
        </div>
      </div>

      <div className="mt-12">
        <div className="border border-destructive rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Delete Account</h3>
          <p className="text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() =>   handleDelete()} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}