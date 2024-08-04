'use client'

import React from 'react'
import { SideBar } from '@/components'

type Props = {}

const DashboardPage = (props: Props) => {
    return (
        <div className='bg-custom-gradient w-full min-h-screen flex items-center justify-even p-4'>
            <SideBar />

            <div>DashboardPage</div>
        </div>
    )
}

export default DashboardPage