import { FC } from 'react'
import { ProfileEditor, AccountModal } from '@/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverTrigger } from '@/components/ui/popover'

type Props = {}

const Account: FC = (props: Props) => {
    return (
        <Popover>
            <PopoverTrigger className='w-full flex flex-col justify-start p-0 border-background'>
                <div className='w-full flex gap-x-3 border-background p-2 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer'>
                    <Avatar className='w-11 h-11 bg-cover'>
                        <AvatarImage src="/images/default-avatar.png" alt="Avatar" />
                        <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col justify-center items-start'>
                        <span className='text-base font-semibold'>Simon Powel</span>
                        <span className='text-sm font-normal'>0123456789</span>
                    </div>
                </div>
            </PopoverTrigger>
            <AccountModal />
            <div className='w-full text-right'>
                <ProfileEditor />
            </div>
        </Popover>
    )
}

export default Account