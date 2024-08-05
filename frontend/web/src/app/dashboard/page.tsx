'use client'

import { useState, useEffect } from 'react'
import { SideBar, HeaderMenu, BreadcrumbPath, ProductTable, ProductDetail } from '@/components'
import { Product, columns } from '@/components/products/ProductColumns'
import { getData, getDetailData } from '@/utils/index'
import { DetailProduct } from '@/utils/index'
import { motion } from 'framer-motion'

const DashboardPage = () => {
    const [data, setData] = useState<Product[]>([])
    const [detailData, setDetailData] = useState<DetailProduct[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [filteredData, setFilteredData] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const productData = await getData()
            const detailProductData = await getDetailData()
            setData(productData)
            setDetailData(detailProductData)
            setFilteredData(productData)
        }
        fetchData()
    }, [])

    const categoryMap: { [key: string]: keyof DetailProduct } = {
        "Therapeutic": "therapeuticClass",
        "Formulation": "formulation",
        "Systemic": "systemicCategory",
        "Usage Duration": "usageDuration",
        "Prescription Status": "routeOfAdministration",
        "Target Population": "targetPopulation",
        "Drug Classes": "drugClass",
    }

    const handleRowClick = (product: Product) => {
        setSelectedProduct(product)
    }

    const handleCategoryChange = (category: string, subCategory?: string) => {
        setSelectedCategory(category)

        if (category === 'All') {
            setFilteredData(data)
        } else {
            const categoryKey = categoryMap[category]
            const filtered = data.filter(product => {
                const detail = detailData.find(detail => detail.id === product.id)
                if (!detail) return false

                if (subCategory) {
                    return (detail[categoryKey] as string)?.includes(subCategory)
                }
                return detail[categoryKey] !== undefined
            })
            setFilteredData(filtered)
        }
    }

    return (
        <div className='bg-custom-gradient w-full h-screen flex items-center justify-even overflow-hidden p-3'>
            <SideBar />

            <div className="ml-2 flex-grow h-full relative">
                <HeaderMenu products={data} detailData={detailData} setFilteredProducts={setFilteredData} onCategoryChange={handleCategoryChange} />
                <div className='pt-24 ml-2'>
                    <BreadcrumbPath selectedCategory={selectedCategory} selectedProduct={selectedProduct} />
                    {selectedProduct ?
                        <ProductDetail detailData={detailData} selectedProduct={selectedProduct} onClose={() => setSelectedProduct(null)} />
                        :
                        <ProductTable columns={columns} data={filteredData} onRowClick={handleRowClick} />
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardPage