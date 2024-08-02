"use client";

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import ImageComponent from '../components/flag';

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
    <section className='bg-custom-gradient w-full h-screen flex items-center justify-center relative'>
      {/* Flag in the top-right corner */}
      <div className='absolute top-0 right-0 m-4'>
        <ImageComponent />
      </div>

      <div className="flex w-full max-w-screen-lg">
        {/* Left side: Login Picture */}
        <div className="w-1/2 min-h-screen flex items-center justify-center">
          <Image src="/images/login-pic.png" alt="Login Picture" width={311} height={356} />
        </div>

        {/* Right side: Logo and Login Form */}
        <div className="w-1/2 min-h-screen flex flex-col items-center justify-center p-4">
          {/* Logo and Login Text */}
          <div className="flex flex-col items-center mb-4">
            <Image src="/images/logo.png" alt="mediscan logo" width={74} height={86} />
            <span className='text-customGreen mt-2'>Login</span>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col items-center w-full max-w-sm">
            <input 
              placeholder='Employee number' 
              className='font-manrope text-sm font-medium leading-5 text-left mb-2 w-full px-4 py-2 border border-gray-300 rounded' 
            />
            <input 
              placeholder='Password' 
              className='font-manrope text-sm font-medium leading-5 text-left mb-2 w-full px-4 py-2 border border-gray-300 rounded' 
            />
            <span className='text-sm text-right mt-2 w-full'>Forget Password?</span>

            <div className="mt-4">
              <button style={{ backgroundColor: '#F5F8FB' }} className='bg-white border border-white text-center text-black px-4 py-2'>Login</button>
            </div>

            <p className='text-sm mt-4'>Don’t have an account? <a href="/signup">Sign up</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}