'use client'

import { FC, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

type Props = {}

const ProfileEditor: FC = (props: Props) => {
    const profileImgRef = useRef<HTMLInputElement>(null);

    const handleImgClick = () => {
        if (profileImgRef.current) {
            profileImgRef.current.click();
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-transparent text-primary underline hover:bg-secondary'>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full flex py-4 justify-center items-start">
                    <div className='flex justify-center items-center mr-6'>
                        <div className='absolute flex justify-center items-center gap-x-5 z-10' onClick={handleImgClick}>
                            <div className='w-[60px] h-[60px] rounded-full bg-primary/70 flex justify-center items-center cursor-pointer'>
                                <Image src="/images/plus.png" alt="Plus" width={15} height={15}></Image>
                            </div>
                            <input
                                type='file'
                                hidden
                                accept='image/*'
                                ref={profileImgRef}
                                name='profileImage'
                            // onChange={(e) => handleImgChange(e, "profileImg")}
                            />
                        </div>
                        <div className='w-[60px] h-[60px] rounded-full z-0'>
                            <Image src="/images/default-avatar.png" alt="Avatar" width={78} height={78}>
                            </Image>
                        </div>
                    </div>
                    <div className='w-full'>
                        <span className='w-full h-12 mb-4'>Employee number: 0123456789</span>
                        <Input id="name" type='text' placeholder='Full Name' className="mt-4" />
                        <Input id="password" type='password' placeholder='Password' className="mt-4" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileEditor