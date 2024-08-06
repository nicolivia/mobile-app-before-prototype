'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Product } from '@/components/products/ProductColumns'
import { DetailProduct } from '@/utils/index'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts'
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'

const ProductDetail: FC<ProductDetailProps> = ({ detailData, selectedProduct, onClose }) => {
    const detail = detailData.find(detail => detail.id === selectedProduct.id);
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });

    return (
        <motion.div
            initial={{ x: 2000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 2000, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full h-full relative'
        >
            {/* Close button */}
            <Button
                className='absolute -top-12 right-5 bg-impact rounded-xl hover:bg-impact/80'
                onClick={onClose}
            >
                Close
            </Button>

            <div className='w-full bg-white/20 rounded-3xl mt-5 flex flex-col'>
                <div className='w-full flex justify-start items-start gap-x-3'>
                    {/* Image */}
                    <div className='w-1/5 h-48 bg-white p-2 rounded-3xl flex justify-center items-center'>
                        <Image src={selectedProduct.image} alt={selectedProduct.productName} width={110} height={110} className='rounded-2xl' />
                    </div>
                    {/* Detail section 1 */}
                    <div className='w-4/5 h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start '>
                        <span className='w-full text-md font-bold text-impact mb-1'>General Information</span>
                        <div className='w-full flex justify-between'>
                            <div className='w-1/2 flex flex-col gap-y-2'>
                                <p className='text-sm'><strong>Product Name:</strong> {selectedProduct.productName}</p>
                                <p className='text-sm'><strong>Brand Name:</strong> {selectedProduct.brandName}</p>
                                <p className='text-sm'><strong>Generic Name:</strong> {selectedProduct.genericName}</p>
                                <p className='text-sm'><strong>Manufacturer:</strong> {selectedProduct.manufacturer}</p>
                            </div>
                            <div className='w-1/2 flex flex-col gap-y-2'>
                                {detail && (
                                    <p className='text-sm'><strong>Systemic Category:</strong> {detail.systemicCategory}</p>
                                )}
                                <p className='text-sm'><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
                                <p className='text-sm'><strong>Since:</strong> {selectedProduct.since}</p>
                                <p className='text-sm'><strong>Updated:</strong> {selectedProduct.updated}</p>
                            </div>
                            <div className='w-1/2 flex flex-col gap-y-2'>
                                {detail && (
                                    <>
                                        <p className='text-sm'><strong>Therapeutic Class:</strong> {detail.therapeuticClass}</p>
                                        <p className='text-sm'><strong>Drug Class:</strong> {detail.drugClass}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between w-full'>
                    {detail && (
                        <div className='w-4/5 mr-3'>
                            <div className='w-full flex flex-col mt-3'>
                                {/* Detail section 2 */}
                                <div className='flex justify-center items-center gap-x-3'>
                                    <div className='w-1/2 h-h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2'>
                                        <h2 className='w-full text-md font-bold text-impact mb-1'>Composition and Formulation</h2>
                                        <p className='text-sm'><strong>Active Ingredients:</strong> {detail.activeIngredients}</p>
                                        <p className='text-sm'><strong>Inactive Ingredients:</strong> {detail.inactiveIngredients}</p>
                                        <p className='text-sm'><strong>Formulation:</strong> {detail.formulation}</p>
                                        <p className='text-sm'><strong>Strength:</strong> {detail.strength}</p>
                                    </div>
                                    {/* Detail section 3 */}
                                    <div className='w-1/2 h-h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2'>
                                        <h2 className='w-full text-md font-bold text-impact mb-1'>Usage and Administration</h2>
                                        <p className='text-sm'><strong>Dosage:</strong> {detail.dosage}</p>
                                        <p className='text-sm'><strong>Route of Administration:</strong> {detail.routeOfAdministration}</p>
                                        <p className='text-sm'><strong>Indications:</strong> {detail.indications}</p>
                                        <p className='text-sm'><strong>Contraindications:</strong> {detail.contraindications}</p>
                                    </div>
                                </div>
                                <div className='w=4/5 flex justify-center items-center gap-x-3 mt-3'>
                                    {/* Detail section 4 */}
                                    <div className='w-1/2 h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2'>
                                        <h2 className='w-full text-md font-bold text-impact mb-1'>Safety and Storage</h2>
                                        <p className='text-sm'><strong>Side Effects:</strong> {detail.sideEffects}</p>
                                        <p className='text-sm'><strong>Interactions:</strong> {detail.interactions}</p>
                                        <p className='text-sm'><strong>Warnings:</strong> {detail.warnings}</p>
                                        <p className='text-sm'><strong>Storage Conditions:</strong> {detail.storageConditions}</p>
                                    </div>
                                    {/* Detail section 5 */}
                                    <div className='w-1/2 h-48 bg-white p-6 rounded-3xl flex flex-col justify-center items-start gap-y-2'>
                                        <h2 className='w-full text-md font-bold text-impact mb-1'>Regulatory Information</h2>
                                        <p className='text-sm'><strong>Usage Duration:</strong> {detail.usageDuration}</p>
                                        <p className='text-sm'><strong>Approval Date:</strong> {detail.approvalDate}</p>
                                        <p className='text-sm'><strong>Expiry Date:</strong> {detail.expiryDate}</p>
                                        <p className='text-sm'><strong>Batch Number:</strong> {detail.batchNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='w-1/5 bg-white p-6 rounded-3xl flex flex-col justify-start mt-3'>
                        <h2 className='w-full text-md font-bold text-impact mb-2'>Description</h2>
                        {detail && (
                            <>
                                <p className='text-sm'><strong>Target Population:</strong> {detail.targetPopulation}</p>
                                <p className='text-sm mt-3'>{detail.description}</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Bar chart */}
                <ChartContainer config={chartConfig} className="w-full max-h-[250px] bg-white p-3 mt-3 rounded-3xl">
                    <div className='w-full flex justify-between px-3'>
                        <h2 className='w-full text-lg font-bold text-impact mb-2'>Stock Levels Over Time</h2>
                        <div className='flex justify-end w-40 text-md text-primary mb-4 text-right bg-secondary rounded-lg p-2'>
                            <h2 className='mr-3'>Current Stock:</h2>
                            {stockData.map((entry, index) => (
                                <strong key={`cell-${index}`}>
                                    {entry.date === currentMonth && (entry.stock)}
                                </strong>
                            ))}
                        </div>
                    </div>
                    <BarChart accessibilityLayer data={stockData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='date'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="stock" radius={4} barSize={40}>
                            {stockData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.date === currentMonth ? '#60969A' : '#D6F5FF'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>
        </motion.div>
    )
}

export default ProductDetail

interface ProductDetailProps {
    detailData: DetailProduct[]
    selectedProduct: Product
    onClose: () => void
}

const chartConfig = {
    stock: {
        label: "Stock",
        color: "#ffe978",
    },
} satisfies ChartConfig

const stockData = [
    { date: 'Jan', stock: 80 },
    { date: 'Feb', stock: 100 },
    { date: 'Mar', stock: 95 },
    { date: 'Apr', stock: 80 },
    { date: 'May', stock: 70 },
    { date: 'Jun', stock: 60 },
    { date: 'Jul', stock: 50 },
    { date: 'Aug', stock: 40 },
    { date: 'Sep', stock: 30 },
    { date: 'Oct', stock: 20 },
    { date: 'Nov', stock: 20 },
    { date: 'Dec', stock: 20 },
];
