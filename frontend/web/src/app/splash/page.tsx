"use client"

import Image from 'next/image'
import { LanguageOption } from '@/components'

export default function SplashPage() {

    return (
        <div className='bg-custom-gradient w-full min-h-screen flex items-center justify-center relative'>
            
            {/* Logo */}
            <div className="flex flex-col items-center">
                <Image src="/images/logo.png" alt="mediscan logo" width={74} height={86} />
                <Image src="/images/splash.png" alt="waiting pic" width={63} height={46} />
            </div>

            {/* Flag in the top-right corner */}
            <div className='absolute top-2 right-8 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer'>
                <LanguageOption />
            </div>
        </div >
    );
}