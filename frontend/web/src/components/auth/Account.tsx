import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProfileEditor } from '@/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription } from '@/components/ui/card'

type Props = {}

const Account: FC = (props: Props) => {
    return (
        <Card className='w-full border-background shadow-none'>
            <CardContent className='flex flex-col justify-start p-0 border-background'>
                <div className='flex gap-x-2 border-background'>
                    <Avatar>
                        <AvatarImage src="/images/default-avatar.png" alt="Avatar" />
                        <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className='text-sm font-semibold'>Simon Powel</span>
                        <CardDescription>0123456789</CardDescription>
                    </div>
                </div>
                <div className='text-right'>
                    <ProfileEditor />
                </div>
            </CardContent>
        </Card>
    )
}

export default Account