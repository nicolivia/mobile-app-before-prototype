'use client'

import { FC, useState, Fragment } from 'react'
import SearchBar from '../SearchBar'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { Product } from '@/components/products/ProductColumns'
import { DetailProduct } from '@/utils/index'

interface HeaderMenuProps {
    products: Product[]
    detailData: DetailProduct[]
    setFilteredProducts: (products: Product[]) => void
    onCategoryChange: (category: string, subCategory?: string) => void;
}

const HeaderMenu: FC<HeaderMenuProps> = ({ products, detailData, setFilteredProducts, onCategoryChange }) => {
    const handleCategoryChange = (category: string, subCategory?: string) => {
        onCategoryChange(category, subCategory);
    }

    const handleSearch = (query: string) => {
        if (query === '') {
            setFilteredProducts(products);
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = products.filter(product =>
                product.productName.toLowerCase().includes(lowerCaseQuery) ||
                product.brandName.toLowerCase().includes(lowerCaseQuery) ||
                product.genericName.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredProducts(filtered);
        }
    }

    return (
        <div className='absolute -top-3 -right-3 w-full h-20 p-10 flex justify-between items-center shadow-lg rounded-bl-3xl bg-white'>
            <Menubar className='border-none shadow-none bg-inherit'>
                {Object.keys(categories).map((category) => (
                    <MenubarMenu key={category}>
                        <MenubarTrigger
                            onClick={() => handleCategoryChange(category)}
                            className='flex justify-center items-center rounded-lg py-3 px-5 cursor-pointer'
                        >
                            {category}
                        </MenubarTrigger>
                        {category !== 'All' && (
                            <MenubarContent>
                                {categories[category].map((subCategory) => (
                                    <Fragment key={subCategory}>
                                        <MenubarItem onClick={() => handleCategoryChange(category, subCategory)}>
                                            {subCategory}
                                        </MenubarItem>
                                    </Fragment>
                                ))}
                            </MenubarContent>
                        )}
                    </MenubarMenu>
                ))}
            </Menubar>

            <SearchBar onSearch={handleSearch} />
        </div>
    )
}

export default HeaderMenu

type Categories = {
    [key: string]: string[]
};

const categories: Categories = {
    "All": [],
    "Therapeutic": [
        "Analgesics", "Antibiotics", "Antivirals", "Antifungals", "Antihistamines", "Antidepressants", "Antipsychotics", "Antihypertensives", "Diuretics", "Antidiabetics", "Statins", "Bronchodilators", "Corticosteroids", "Anticoagulants", "Immunosuppressants"
    ],
    "Formulation": [
        "Tablets", "Capsules", "Syrups", "Injections", "Creams/Ointments", "Inhalers", "Suppositories"
    ],
    "Systemic": [
        "Cardiovascular System", "Respiratory System", "Digestive System", "Nervous System", "Musculoskeletal System", "Endocrine System", "Urinary System", "Reproductive System", "Immune System"
    ],
    "Usage Duration": [
        "Acute", "Chronic", "PRN"
    ],
    "Prescription Status": [
        "Prescription-Only Medicines (POM)", "Over-The-Counter Medicines (OTC)", "Controlled Substances"
    ],
    "Target Population": [
        "Adults", "Paediatrics", "Geriatrics", "Pregnant/Breastfeeding Women"
    ],
    "Drug Classes": [
        "Beta-blockers", "ACE Inhibitors", "SSRIs", "NSAIDs", "Benzodiazepines", "Opioids"
    ]
};