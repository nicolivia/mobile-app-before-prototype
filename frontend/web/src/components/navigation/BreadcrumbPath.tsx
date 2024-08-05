import { FC } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Product } from '../products/ProductColumns'

const BreadcrumbPath: FC<Props> = ({ selectedCategory, selectedProduct }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">All</BreadcrumbLink>
                </BreadcrumbItem>
                {selectedCategory && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/dashboard?category=${selectedCategory}`}>
                                {selectedCategory}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {selectedProduct && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedProduct.productName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbPath

type Props = {
    selectedCategory: string | null
    selectedProduct: Product | null
}