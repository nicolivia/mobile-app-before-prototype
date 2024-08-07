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
                    <Avatar>
                        <AvatarImage src="/images/default-avatar.png" alt="Avatar" />
                        <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className='text-sm font-semibold'>Simon Powel</span>
                        <span>0123456789</span>
                    </div>
                </div>
                <div className='w-full text-right'>
                    <ProfileEditor />
                </div>
            </PopoverTrigger>
            <AccountModal />
        </Popover>
    )
}

export default Account