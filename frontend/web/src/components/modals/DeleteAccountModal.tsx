import { FC } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '../ui/use-toast'
import { CiCircleRemove } from "react-icons/ci"

const DeleteAccountModal: FC = () => {
    const { toast } = useToast()

    const handleDeleteAccount = () => {
        toast({
            title: 'Account deleted',
            description: 'Your account has been deleted successfully',
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className='flex items-center gap-x-2'>
                    <CiCircleRemove className='w-5 h-auto text-[#ff4949]' />
                    <span className='text-sm text-[#ff4949] capitalize'>delete account</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAccountModal
