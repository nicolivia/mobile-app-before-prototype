import { FC, MouseEvent } from 'react'
import { useRouter } from 'next/navigation';
import { PopoverContent } from '@/components/ui/popover'
import { useToast } from '../ui/use-toast'
import { DeleteAccountModal } from '@/components'
import { CiLogout } from "react-icons/ci"
import { useMutation } from '@tanstack/react-query'

const AccountModal: FC = () => {
    const { toast } = useToast()
    const router = useRouter();

    const { mutate: logoutMutation, isError, isPending, error } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/users/logout', {
                    method: 'POST',
                })

                const data = await res.json();
                if (!res.ok || data.error) throw new Error(data.error || 'Failed to logout');

            } catch (error) {
                throw new Error('An unknown error occurred');
            }
        },
        onSuccess: () => {
            toast({
                title: 'Logged out',
                description: 'logged out successfully',
            })
            router.push('/login');
        },
    })

    const handleLogout = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        logoutMutation()
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