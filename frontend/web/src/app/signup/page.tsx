"use client"

import { FC } from 'react'
import Image from 'next/image'
import { LanguageOption, SignUpForm } from '@/components'

const SignUpPage: FC = () => {
    return (
        <div className='bg-custom-gradient w-full min-h-screen m-auto flex items-center justify-even'>

            {/* Left side: Login Picture */}
            <div className="w-1/2 min-h-screen flex items-center justify-center">
                <Image src="/images/login-pic.png" alt="Login Picture" width={311} height={356} />
            </div>

            {/* Right side: Logo and Login Form */}
            <div className="relative w-1/2 min-h-screen flex flex-col items-center justify-center p-4">
                {/* Flag in the top-right corner */}
                <div className='absolute top-2 right-8 m-4 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer'>
                    <LanguageOption />
                </div>

                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <Image src="/images/logo.png" alt="mediscan logo" width={74} height={86} />
                </div>

                {/* Input Fields */}
                <SignUpForm />
            </div>
        </div >
    );
}

export default SignUpPage