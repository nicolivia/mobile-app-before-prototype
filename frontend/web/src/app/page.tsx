'use client';

import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { LanguageOption } from '@/components';

const LoadingHeartBeat = dynamic(() => import('@/components/loading/LoadingHeartBeat'), {
  ssr: false,
});

const Home: FC = () => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsReady(true);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isReady) {
      router.push('/login');
    }
  }, [isReady, router]);

  if (!isReady) {
    return (
      <div className='bg-custom-gradient w-full min-h-screen flex items-center justify-center relative'>
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image src="/images/logo.png" alt="mediscan logo" width={74} height={86} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70px' }}>
            <LoadingHeartBeat />
          </div>
        </div>

        {/* Flag in the top-right corner */}
        <div className='absolute top-2 right-8 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer'>
          <LanguageOption />
        </div>
      </div>
    );
  }

  return null;
}

export default Home;