'use client'

import { useState, useEffect } from 'react'
import { SideBar, HeaderMenu, BreadcrumbPath, ProductTable, ProductDetail, CameraSection } from '@/components'
import { Product, columns } from '@/components/products/ProductColumns'
import { getData, getDetailData, DetailProduct } from '@/utils/index'

const DashboardPage = () => {
    const [data, setData] = useState<Product[]>([])
    const [detailData, setDetailData] = useState<DetailProduct[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [filteredData, setFilteredData] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
    const [isCamera, setIsCamera] = useState(false)
    const [isProducts, setIsProducts] = useState(true)



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
        setSelectedSubCategory(subCategory || null)

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

    const handleToggleCamera = () => {
        setIsCamera(true)
        setIsProducts(false)
    }

    const handleShowProducts = () => {
        setIsCamera(false)
        setIsProducts(true)
    }

    return (
        <div className='bg-custom-gradient w-full h-screen flex items-center justify-even overflow-hidden p-3'>
            <SideBar onToggleCamera={handleToggleCamera} onShowProducts={handleShowProducts} />

            <div className="ml-2 flex-grow h-full relative">
                {isCamera && <CameraSection data={data} onRowClick={handleRowClick} />}
                {isProducts && (
                    <>
                        <HeaderMenu products={data} detailData={detailData} setFilteredProducts={setFilteredData} onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
                        <div className='pt-24 ml-2'>
                            <BreadcrumbPath selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} selectedProduct={selectedProduct} />
                            {selectedProduct ?
                                <ProductDetail detailData={detailData} selectedProduct={selectedProduct} onClose={() => setSelectedProduct(null)} />
                                :
                                <ProductTable columns={columns} data={filteredData} onRowClick={handleRowClick} />
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default DashboardPage