import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Account } from '@/components'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { CiSettings, CiMedicalClipboard, CiCamera } from "react-icons/ci";

const NavLinks = [
    { icon: CiCamera, path: '', label: 'camera' },
    { icon: CiMedicalClipboard, path: '/dashboard', label: 'products' },
    { icon: CiSettings, path: '', label: 'settings' },
];
type Props = {}

const SideBar: FC = (props: Props) => {
    return (
        <aside className='sticky flex flex-col justify-between w-52 m-4 h-full p-4 rounded-3xl bg-background shadow-lg overflow-hidden'>
            {/* Account Section */}
            <Account />

            {/* Navigation Menu */}
            <NavigationMenu>
                <NavigationMenuList className='w-[150px] flex flex-col justify-center items-end gap-y-2'>
                    {NavLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className='flex justify-start w-full'>
                            <Link href={link.path} passHref legacyBehavior>
                                <NavigationMenuTrigger className='flex justify-start items-center w-full gap-x-3'>
                                    <div className='w-6 h-6 flex justify-center items-center'>
                                        <link.icon className='w-5 h-auto' />
                                    </div>
                                    <span className='text-sm capitalize'>
                                        {link.label}
                                    </span>
                                </NavigationMenuTrigger>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            {/* Logo */}
            <div className="flex flex-col items-center my-6">
                <Image src="/images/logo.png" alt="mediscan logo" width={54} height={66} />
            </div>
        </aside>
    )
}

export default SideBar