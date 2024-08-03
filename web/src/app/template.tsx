'use client'

import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
};

const Template: FC<RootLayoutProps> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <>
            <motion.main
                variants={variants}
                initial='hidden'
                animate='enter'
                transition={{ type: 'linear', delay: 0.2, duration: 0.4 }}
            >
                {children}
            </motion.main>
        </>
    )
}

export default Template

interface RootLayoutProps {
    children: ReactNode;
}