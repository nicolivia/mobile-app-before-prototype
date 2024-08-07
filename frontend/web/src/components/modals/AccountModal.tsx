import { FC } from 'react'
import { PopoverContent } from '@/components/ui/popover'
import { useToast } from '../ui/use-toast'
import { DeleteAccountModal } from '@/components'
import { CiLogout } from "react-icons/ci"

const AccountModal: FC = () => {
    const { toast } = useToast()

    const handleLogout = () => {
        console.log('logout')
        toast({
            title: 'Logged out',
            description: 'You have been logged out successfully',
        })
    }

    return (
        <PopoverContent className='flex flex-col justify-start items-start ml-8 rounded-2xl mb-10'>
            <div
                onClick={handleLogout}
                className='w-full flex gap-x-3 hover:bg-secondary p-4 rounded-lg transition-all duration-200 cursor-pointer'
            >
                <CiLogout className='w-5 h-auto' />
                <span className='text-sm capitalize'>logout</span>
            </div>
            <span className='w-full h-[0.8px] bg-secondary rounded-lg'></span>
            <div
                className='w-full flex gap-x-3 hover:bg-[#ff4949]/30 p-4 rounded-lg transition-all duration-200 cursor-pointer'
            >
                <DeleteAccountModal />
            </div>
        </PopoverContent>
    )
}

export default AccountModal