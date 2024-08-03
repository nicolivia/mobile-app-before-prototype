"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link'
import * as zod from 'zod'
import Image from 'next/image';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LanguageOption } from '@/components'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('please fill all');
            return;
        }
        setError('');
        alert('success！');
    };

    return (
        <div className='bg-custom-gradient w-full min-h-screen m-auto flex items-center justify-even'>

            <div className="w-1/2 min-h-screen flex items-center justify-center">
                {/* Left side: Login Picture */}
                <Image src="/images/login-pic.png" alt="Login Picture" width={311} height={356} />
            </div>

            {/* Right side: Logo and Login Form */}
            <div className="relative w-1/2 min-h-screen flex flex-col items-center justify-center p-4">
                {/* Flag in the top-right corner */}
                <div className='absolute top-2 right-8 m-4 py-2 px-4 rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer'>
                    <LanguageOption />
                </div>

                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <Image src="/images/logo.png" alt="mediscan logo" width={74} height={86} />
                </div>

                {/* Input Fields */}
                <div className="flex flex-col items-center w-[274px] max-w-sm gap-y-4">
                    <span className='text-2xl font-bold mt-4'>Login</span>
                    <input
                        placeholder='Employee number'
                        className='input'
                    />
                    <input
                        placeholder='Password'
                        className='input'
                    />
                    <span className='text-sm text-right w-full cursor-pointer text-red-500 hover:text-red-500/60'>Forget Password?</span>

                    <Link href='/dashboard'>
                        <Button variant='secondary'>Login</Button>
                    </Link>

                    <span className='w-full text-left text-sm mt-4'>Don’t have an account? <a href="/signup" className='underline text-primary hover:text-red-500/60'>Sign up</a></span>
                </div>
            </div>
        </div >
    );
}