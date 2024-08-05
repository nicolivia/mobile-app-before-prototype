'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Product } from '@/components/products/ProductColumns'
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart'

const ProductDetail: FC<ProductDetailProps> = ({ detailData, selectedProduct }) => {
    const detail = detailData.find(detail => detail.id === selectedProduct.id)

    return (
        <div>
            <div className='w-full bg-white/20 rounded-3xl mt-5 flex flex-col'>
                <div className='w-full flex justify-start items-start gap-x-4'>
                    <div className='w-1/5 h-48 bg-white p-2 rounded-3xl flex justify-center items-center'>
                        <Image src={selectedProduct.image} alt={selectedProduct.name} width={135} height={135} className='rounded-2xl' />
                    </div>
                    <div className='w-2/5 h-48 bg-white p-6 rounded-3xl flex flex-col justify-start items-start gap-y-2'>
                        <span className='w-full text-lg font-bold text-impact'>General Information</span>
                        <div className='flex gap-x-8'>
                            <div className='flex flex-col gap-y-2'>
                                <p className='text-sm'><strong>Product Name:</strong> {selectedProduct.name}</p>
                                {detail && (
                                    <>
                                        <p className='text-sm'><strong>Brand Name:</strong> {detail.brandName}</p>
                                        <p className='text-sm'><strong>Generic Name:</strong> {detail.genericName}</p>
                                        <p className='text-sm'><strong>Manufacturer:</strong> {detail.manufacturer}</p>
                                    </>
                                )}
                            </div>
                            <div className='flex flex-col gap-y-2'>
                                <p className='text-sm'><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
                                <p className='text-sm'><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
                                <p className='text-sm'><strong>Since:</strong> {selectedProduct.since}</p>
                                <p className='text-sm'><strong>Updated:</strong> {selectedProduct.updated}</p>
                            </div>
                        </div>
                    </div>
                    {detail && (
                        <div className='w-2/5 h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2'>
                            <h2 className='w-full text-lg font-bold text-impact'>Composition and Formulation</h2>
                            <p className='text-sm'><strong>Active Ingredients:</strong> {detail.activeIngredients}</p>
                            <p className='text-sm'><strong>Inactive Ingredients:</strong> {detail.inactiveIngredients}</p>
                            <p className='text-sm'><strong>Form:</strong> {detail.form}</p>
                            <p className='text-sm'><strong>Strength:</strong> {detail.strength}</p>
                        </div>
                    )}
                </div>

                {detail && (
                    <div className='flex flex-col'>
                        <div className='flex gap-x-5'>
                            <div className='w-1/2 h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2 mt-5'>
                                <h2 className='w-full text-lg font-bold text-impact'>Usage and Administration</h2>
                                <p className='text-sm'><strong>Dosage:</strong> {detail.dosage}</p>
                                <p className='text-sm'><strong>Route of Administration:</strong> {detail.routeOfAdministration}</p>
                                <p className='text-sm'><strong>Indications:</strong> {detail.indications}</p>
                                <p className='text-sm'><strong>Contraindications:</strong> {detail.contraindications}</p>
                            </div>
                            <div className='w-1/2 h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2 mt-5'>
                                <h2 className='w-full text-lg font-bold text-impact'>Safety and Storage</h2>
                                <p className='text-sm'><strong>Side Effects:</strong> {detail.sideEffects}</p>
                                <p className='text-sm'><strong>Interactions:</strong> {detail.interactions}</p>
                                <p className='text-sm'><strong>Warnings:</strong> {detail.warnings}</p>
                                <p className='text-sm'><strong>Storage Conditions:</strong> {detail.storageConditions}</p>
                            </div>
                        </div>
                        <div className='w-full h-40 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2 mt-5'>
                            <h2 className='w-full text-lg font-bold text-impact'>Regulatory Information</h2>
                            <p className='text-sm'><strong>Approval Date:</strong> {detail.approvalDate}</p>
                            <p className='text-sm'><strong>Expiry Date:</strong> {detail.expiryDate}</p>
                            <p className='text-sm'><strong>Batch Number:</strong> {detail.batchNumber}</p>
                        </div>
                    </div>
                )}

                {/* Bar chart */}
                <ChartContainer config={chartConfig} className="max-h-[250px] w-full bg-white p-3 mt-5 rounded-3xl">
                    <div className='w-full flex justify-between'>
                        <h2 className='w-full text-lg font-bold text-impact mb-4'>Stock Levels Over Time</h2>
                        <h2 className='w-full text-lg font-bold text-primary mb-4'>Current Stock: {selectedProduct.stock}</h2>
                    </div>
                    <BarChart accessibilityLayer data={stockData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='month'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 5)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="stock" fill="var(--color-stock)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    )
}

export default ProductDetail

interface ProductDetailProps {
    detailData: DetailProduct[]
    selectedProduct: Product
}

export interface DetailProduct {
    id: number
    brandName: string
    genericName: string
    manufacturer: string
    activeIngredients: string
    inactiveIngredients: string
    form: string
    strength: string
    dosage: string
    routeOfAdministration: string
    indications: string
    contraindications: string
    sideEffects: string
    interactions: string
    warnings: string
    storageConditions: string
    approvalDate: string
    expiryDate: string
    batchNumber: string
    description: string
}

const chartConfig = {
    stock: {
        label: "Stock",
        color: "#2563eb",
    },
} satisfies ChartConfig

const stockData = [
    { date: '1 January', stock: 80 },
    { date: '1 February', stock: 100 },
    { date: '1 March', stock: 95 },
    { date: '1 April', stock: 80 },
    { date: '1 May', stock: 70 },
    { date: '1 June', stock: 60 },
    { date: '1 July', stock: 50 },
    { date: '1 August', stock: 40 },
    { date: '1 September', stock: 30 },
    { date: '1 October', stock: 20 },
    { date: '1 November', stock: 20 },
    { date: '1 December', stock: 20 },
];

