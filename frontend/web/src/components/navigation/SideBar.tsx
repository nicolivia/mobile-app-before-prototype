import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Account, SettingsModal } from '@/components'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { CiSettings, CiMedicalClipboard, CiCamera } from "react-icons/ci";
import Logo from '../../../public/images/logo.png'
import { useMutation } from '@tanstack/react-query'

const SideBar: FC<SideBarProps> = ({ onToggleCamera, onShowProducts }) => {

    const { mutate: checkAuth, isPending, isError, error } = useMutation({
        mutationFn: async () => {

        }
    })

    const handleClick = (label: string) => {
        if (label === 'camera') {
            onToggleCamera()
        } else if (label === 'products') {
            onShowProducts()
        }
    }

    return (
        <aside className='flex flex-col justify-between min-w-48 h-full py-6 px-2 rounded-3xl bg-background shadow-lg overflow-hidden'>
            <div className='w-full'>
                {/* Account Section */}
                <div className='w-full mb-10'>
                    <Account />
                </div>

                {/* Navigation Menu */}
                <NavigationMenu className='w-full'>
                    <NavigationMenuList className='w-[176px] flex flex-col justify-center items-end gap-y-2'>
                        {navLinks.map((link, index) => (
                            <>
                                {link.label === 'settings' ? (
                                    <Popover key={index}>
                                        <PopoverTrigger
                                            onClick={() => handleClick(link.label)}
                                            className='w-[176px] flex justify-start items-center gap-x-3 py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-md'
                                        >
                                            <div className='w-6 h-6 flex justify-center items-center'>
                                                <link.icon className='w-5 h-auto' />
                                            </div>
                                            <span className='text-sm capitalize font-light'>
                                                {link.label}
                                            </span>
                                        </PopoverTrigger>
                                        <SettingsModal />
                                    </Popover>
                                ) : (
                                    < NavigationMenuItem key={index} className='flex justify-start w-[176px]' >
                                        <Link href={link.path} passHref legacyBehavior>
                                            <NavigationMenuTrigger
                                                onClick={() => handleClick(link.label)}
                                                className='flex justify-start items-center w-full gap-x-3'
                                            >
                                                <div className='w-6 h-6 flex justify-center items-center'>
                                                    <link.icon className='w-5 h-auto' />
                                                </div>
                                                <span className='text-sm capitalize font-light'>
                                                    {link.label}
                                                </span>
                                            </NavigationMenuTrigger>
                                        </Link>
                                    </NavigationMenuItem>
                                )}
                            </>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
                <Image src={Logo} alt="mediscan logo" width={44} height={56} />
            </div>
        </aside >
    )
}

export default SideBar

interface SideBarProps {
    onToggleCamera: () => void
    onShowProducts: () => void
}

const navLinks = [
    { icon: CiCamera, path: '', label: 'camera' },
    { icon: CiMedicalClipboard, path: '/dashboard', label: 'products' },
    { icon: CiSettings, path: '', label: 'settings' },
];