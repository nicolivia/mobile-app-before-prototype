import { FC } from 'react'
import { PopoverContent } from '@/components/ui/popover'
import { ThemeToggler } from '@/components'
import { CiLogout, CiCircleRemove } from "react-icons/ci"

const SettingsModal: FC = () => {
    return (
        <PopoverContent className='flex flex-col justify-start items-start ml-8 rounded-2xl'>
            <div>
                <ThemeToggler />
            </div>
            <div className='w-full flex gap-x-3 hover:bg-secondary p-4 rounded-lg transition-all duration-200'>
                <CiLogout className='w-5 h-auto' />
                <span className='text-sm capitalize'>logout</span>
            </div>
            <span className='w-full h-[0.8px] bg-secondary rounded-lg'></span>
            <div className='w-full flex gap-x-3 hover:bg-secondary p-4 rounded-lg transition-all duration-200'>
                <CiCircleRemove className='w-5 h-auto text-[#ff4949]' />
                <span className='text-sm text-[#ff4949] capitalize'>delete account</span>
            </div>
        </PopoverContent>
    )
}

export default SettingsModal