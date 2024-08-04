'use client'

import { FC } from 'react'
import { SideBar } from '@/components'

type Props = {}

const DashboardPage: FC = (props: Props) => {
    return (
        <div className='bg-custom-gradient w-full h-screen flex items-center justify-even overflow-hidden p-3'>
            <SideBar />

            <div className="ml-4 flex-grow h-full">DashboardPage</div>
        </div>
    )
}

export default DashboardPage