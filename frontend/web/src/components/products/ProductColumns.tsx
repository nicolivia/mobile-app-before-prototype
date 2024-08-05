'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortData } from '@/components'
import Image from 'next/image'

export type Product = {
    image: string;
    id: number;
    productName: string;
    brandName: string;
    genericName: string;
    manufacturer: string;
    price: number;
    stock: number;
    since: string;
    updated: string;
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => {
            return (
                <div className="flex justify-center items-center">
                    <Image src={row.original.image} alt={row.original.productName} width={50} height={50} />
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
        accessorKey: "productName",
        header: ({ column }) => (
            <SortData column={column} title="Product Name" />
        ),
    },
    {
        accessorKey: "brandName",
        header: ({ column }) => (
            <SortData column={column} title="Brand Name" />
        ),
    },
    {
        accessorKey: "genericName",
        header: ({ column }) => (
            <SortData column={column} title="Generic Name" />
        ),
    },
    {
        accessorKey: "manufacturer",
        header: ({ column }) => (
            <SortData column={column} title="Manufacturer" />
        ),
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
        header: ({ column }) => (
            <SortData column={column} title="Stock" />
        ),
    },
    {
        accessorKey: "since",
        header: ({ column }) => (
            <SortData column={column} title="Since" />
        ),
    },
    {
        accessorKey: "updated",
        header: ({ column }) => (
            <SortData column={column} title="Update" />
        ),
    },
];