'use client';

import { FC, useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../../public/loading.json';

interface LottieAnimationProps {
    loop?: boolean;
    autoplay?: boolean;
    width?: number;
    height?: number;
    className?: string;
}

const LoadingHeartBeat: FC<LottieAnimationProps> = ({
    loop = true,
    autoplay = true,
    width = 150,
    height = 150,
    className,
}) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={className}
        >
            <Lottie
                loop={loop}
                animationData={animationData}
                play={autoplay}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default LoadingHeartBeat;