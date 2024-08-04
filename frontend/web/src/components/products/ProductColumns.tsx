'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortData } from '@/components'
import Image from 'next/image'

export type Product = {
    image: string
    id: number
    name: string
    category: string
    price: number
    stock: number
    since: string
    updated: string
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => {
            return (
                <div className="flex justify-center items-center">
                    <Image src={row.original.image} alt={row.original.name} width={50} height={50} />
                </div>
            )
        },
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <SortData column={column} title="ID" />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <SortData column={column} title="NAME" />
        ),
    },
    {
        accessorKey: "category",
        header: "CATEGORY",
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <SortData column={column} title="PRICE" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('price'))
            const formatted = new Intl.NumberFormat("en-GB", {
                style: 'currency',
                currency: 'NZD',
            }).format(amount)

            return <div className='text-right'>{formatted}</div>
        },
    },
    {
        accessorKey: "stock",
        header: "STOCK",
    },
    {
        accessorKey: "since",
        header: ({ column }) => (
            <SortData column={column} title="SINCE" />
        ),
    },
    {
        accessorKey: "updated",
        header: ({ column }) => (
            <SortData column={column} title="UPDATE" />
        ),
    },
];