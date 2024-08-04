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

const HeaderMenu: FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [medicines, setMedicines] = useState<string[]>([]);
    const [filteredMedicines, setFilteredMedicines] = useState<string[]>([]);

    const handleCategoryChange = (category: keyof Categories) => {
        setSelectedCategory(category as string);
    }

    const handleSearch = (query: string) => {
        if (query === '') {
            setFilteredMedicines(medicines);
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = medicines.filter(medicine => medicine.toLowerCase().includes(lowerCaseQuery));
            setFilteredMedicines(filtered);
        }
    }

    return (
        <div className='absolute -top-3 -right-3 w-full h-20 p-10 flex justify-between items-center shadow-lg rounded-bl-3xl bg-white'>
            <Menubar className='border-none shadow-none bg-inherit'>
                {Object.keys(categories).map((category) => (
                    <MenubarMenu key={category}>
                        <MenubarTrigger
                            onClick={() => handleCategoryChange(category as keyof Categories)}
                            className='flex justify-center items-center rounded-lg py-3 px-5 cursor-pointer'
                        >
                            {category}
                        </MenubarTrigger>
                        {category !== 'All' && (
                            <MenubarContent>
                                {categories[category].map((medicine) => (
                                    <Fragment key={medicine}>
                                        <MenubarItem>{medicine}</MenubarItem>
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