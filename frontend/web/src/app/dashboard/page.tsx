'use client'

import { useState, useEffect } from 'react'
import { SideBar, HeaderMenu, BreadcrumbPath, ProductTable, ProductDetail } from '@/components'
import { Product, columns } from '@/components/products/ProductColumns'
import { DetailProduct } from '@/components/products/ProductDetail'

const DashboardPage = () => {
    const [data, setData] = useState<Product[]>([])
    const [detailData, setDetailData] = useState<DetailProduct[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const productData = await getData()
            const detailProductData = await getDetailData()
            setData(productData)
            setDetailData(detailProductData)
        }
        fetchData()
    }, [])

    const handleRowClick = (product: Product) => {
        setSelectedProduct(product)
    }

    return (
        <div className='bg-custom-gradient w-full h-screen flex items-center justify-even overflow-hidden p-3'>
            <SideBar />

            <div className="ml-4 flex-grow h-full relative">
                <HeaderMenu />
                <div className='pt-24 ml-4'>
                    <BreadcrumbPath />
                    {selectedProduct ?
                        <ProductDetail detailData={detailData} selectedProduct={selectedProduct} />
                        :
                        <ProductTable columns={columns} data={data} onRowClick={handleRowClick} />
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardPage

const getData = async (): Promise<Product[]> => {
    return [
        {
            image: '/images/default-product.png',
            id: 100000001,
            name: 'Product 1',
            category: 'Category A',
            price: 9.99,
            stock: 100,
            since: '2022-01-01',
            updated: '2022-01-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000002,
            name: 'Product 2',
            category: 'Category B',
            price: 19.99,
            stock: 50,
            since: '2022-02-01',
            updated: '2022-02-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000003,
            name: 'Product 3',
            category: 'Category C',
            price: 14.99,
            stock: 75,
            since: '2022-03-01',
            updated: '2022-03-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000004,
            name: 'Product 4',
            category: 'Category D',
            price: 24.99,
            stock: 25,
            since: '2022-04-01',
            updated: '2022-04-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000005,
            name: 'Product 5',
            category: 'Category E',
            price: 29.99,
            stock: 60,
            since: '2022-05-01',
            updated: '2022-05-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000006,
            name: 'Product 6',
            category: 'Category F',
            price: 34.99,
            stock: 40,
            since: '2022-06-01',
            updated: '2022-06-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000007,
            name: 'Product 7',
            category: 'Category G',
            price: 39.99,
            stock: 80,
            since: '2022-07-01',
            updated: '2022-07-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000008,
            name: 'Product 8',
            category: 'Category H',
            price: 44.99,
            stock: 90,
            since: '2022-08-01',
            updated: '2022-08-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000009,
            name: 'Product 9',
            category: 'Category I',
            price: 49.99,
            stock: 70,
            since: '2022-09-01',
            updated: '2022-09-01',
        },
        {
            image: '/images/default-product.png',
            id: 100000010,
            name: 'Product 10',
            category: 'Category J',
            price: 54.99,
            stock: 55,
            since: '2022-10-01',
            updated: '2022-10-01',
        },
    ];
}


const getDetailData = async (): Promise<DetailProduct[]> => {
    return [
        {
            id: 100000001,
            brandName: 'PainAway',
            genericName: 'Ibuprofen',
            manufacturer: 'Pharma Inc.',
            activeIngredients: 'Ibuprofen 200 mg',
            inactiveIngredients: 'Starch, Silica',
            form: 'Tablet',
            strength: '200 mg',
            dosage: '1 tablet every 4-6 hours',
            routeOfAdministration: 'Oral',
            indications: 'Pain relief, Anti-inflammatory',
            contraindications: 'Allergy to ibuprofen',
            sideEffects: 'Nausea, Dizziness',
            interactions: 'Aspirin, Warfarin',
            warnings: 'Do not exceed 6 tablets in 24 hours',
            storageConditions: 'Store at room temperature',
            approvalDate: '2023-01-01',
            expiryDate: '2025-01-01',
            batchNumber: 'B001',
            description: 'Effective pain relief for mild to moderate pain'
        },
        {
            id: 100000002,
            brandName: 'FluRelief',
            genericName: 'Acetaminophen',
            manufacturer: 'HealthCo',
            activeIngredients: 'Acetaminophen 500 mg',
            inactiveIngredients: 'Microcrystalline cellulose, Magnesium stearate',
            form: 'Capsule',
            strength: '500 mg',
            dosage: '2 capsules every 6 hours',
            routeOfAdministration: 'Oral',
            indications: 'Pain relief, Fever reducer',
            contraindications: 'Liver disease',
            sideEffects: 'Rash, Headache',
            interactions: 'Alcohol, Warfarin',
            warnings: 'Do not exceed 8 capsules in 24 hours',
            storageConditions: 'Store in a cool, dry place',
            approvalDate: '2022-06-15',
            expiryDate: '2024-06-15',
            batchNumber: 'B002',
            description: 'Effective relief from cold and flu symptoms'
        },
        {
            id: 100000003,
            brandName: 'CoughAway',
            genericName: 'Dextromethorphan',
            manufacturer: 'MedLife',
            activeIngredients: 'Dextromethorphan 15 mg/5 ml',
            inactiveIngredients: 'Sucrose, Propylene glycol',
            form: 'Syrup',
            strength: '15 mg/5 ml',
            dosage: '10 ml every 4 hours',
            routeOfAdministration: 'Oral',
            indications: 'Cough suppressant',
            contraindications: 'Asthma, Chronic bronchitis',
            sideEffects: 'Drowsiness, Upset stomach',
            interactions: 'MAO inhibitors, Alcohol',
            warnings: 'Do not use in children under 4 years old',
            storageConditions: 'Store at room temperature',
            approvalDate: '2021-11-20',
            expiryDate: '2023-11-20',
            batchNumber: 'B003',
            description: 'Soothes and suppresses cough'
        },
        {
            id: 100000004,
            brandName: 'VitaBoost',
            genericName: 'Vitamin B12',
            manufacturer: 'NutraWell',
            activeIngredients: 'Cyanocobalamin 1000 mcg/ml',
            inactiveIngredients: 'Sodium chloride, Benzyl alcohol',
            form: 'Injection',
            strength: '1000 mcg/ml',
            dosage: '1 ml once a week',
            routeOfAdministration: 'Intramuscular',
            indications: 'Vitamin B12 deficiency',
            contraindications: 'Allergy to cobalt',
            sideEffects: 'Pain at injection site, Diarrhea',
            interactions: 'Chloramphenicol',
            warnings: 'Administer under medical supervision',
            storageConditions: 'Keep refrigerated',
            approvalDate: '2020-05-10',
            expiryDate: '2022-05-10',
            batchNumber: 'B004',
            description: 'Treats vitamin B12 deficiencies effectively'
        },
        {
            id: 100000005,
            brandName: 'SkinHeal',
            genericName: 'Mupirocin',
            manufacturer: 'DermCare',
            activeIngredients: 'Mupirocin 2%',
            inactiveIngredients: 'Polyethylene glycol',
            form: 'Cream',
            strength: '2%',
            dosage: 'Apply 3 times a day',
            routeOfAdministration: 'Topical',
            indications: 'Bacterial skin infections',
            contraindications: 'Allergy to mupirocin',
            sideEffects: 'Burning, Itching',
            interactions: 'None known',
            warnings: 'For external use only',
            storageConditions: 'Store below 25°C',
            approvalDate: '2023-02-28',
            expiryDate: '2025-02-28',
            batchNumber: 'B005',
            description: 'Effective treatment for bacterial skin infections'
        },
        {
            id: 100000006,
            brandName: 'NicPatch',
            genericName: 'Nicotine',
            manufacturer: 'QuitRight',
            activeIngredients: 'Nicotine 21 mg/patch',
            inactiveIngredients: 'Acrylic adhesive',
            form: 'Patch',
            strength: '21 mg/patch',
            dosage: 'Apply one patch daily',
            routeOfAdministration: 'Transdermal',
            indications: 'Smoking cessation',
            contraindications: 'Pregnancy, Heart disease',
            sideEffects: 'Skin irritation, Insomnia',
            interactions: 'None known',
            warnings: 'Do not smoke while using the patch',
            storageConditions: 'Store at room temperature',
            approvalDate: '2022-08-15',
            expiryDate: '2024-08-15',
            batchNumber: 'B006',
            description: 'Helps to quit smoking'
        },
        {
            id: 100000007,
            brandName: 'AsthmaEase',
            genericName: 'Salbutamol',
            manufacturer: 'Respira',
            activeIngredients: 'Salbutamol 100 mcg/dose',
            inactiveIngredients: 'HFA-134a propellant',
            form: 'Inhaler',
            strength: '100 mcg/dose',
            dosage: '1-2 puffs as needed',
            routeOfAdministration: 'Inhalation',
            indications: 'Bronchospasm, Asthma',
            contraindications: 'Severe cardiac disease',
            sideEffects: 'Tremor, Palpitations',
            interactions: 'Beta-blockers',
            warnings: 'Use only as directed',
            storageConditions: 'Store in a cool, dry place',
            approvalDate: '2021-04-01',
            expiryDate: '2023-04-01',
            batchNumber: 'B007',
            description: 'Provides relief from bronchospasm and asthma symptoms'
        },
        {
            id: 100000008,
            brandName: 'JointGel',
            genericName: 'Diclofenac',
            manufacturer: 'PainFree',
            activeIngredients: 'Diclofenac 1%',
            inactiveIngredients: 'Carbomer, Propylene glycol',
            form: 'Gel',
            strength: '1%',
            dosage: 'Apply 2-4 g 4 times a day',
            routeOfAdministration: 'Topical',
            indications: 'Joint pain, Osteoarthritis',
            contraindications: 'History of allergic reactions to NSAIDs',
            sideEffects: 'Rash, Pruritus',
            interactions: 'Aspirin, Other NSAIDs',
            warnings: 'For external use only',
            storageConditions: 'Store below 25°C',
            approvalDate: '2023-07-10',
            expiryDate: '2025-07-10',
            batchNumber: 'B008',
            description: 'Effective relief for joint pain and osteoarthritis'
        },
        {
            id: 100000009,
            brandName: 'MoisturEase',
            genericName: 'Urea',
            manufacturer: 'SkinCare',
            activeIngredients: 'Urea 10%',
            inactiveIngredients: 'Water, Glycerin',
            form: 'Lotion',
            strength: '10%',
            dosage: 'Apply twice daily',
            routeOfAdministration: 'Topical',
            indications: 'Dry skin, Keratosis pilaris',
            contraindications: 'None known',
            sideEffects: 'Mild irritation',
            interactions: 'None known',
            warnings: 'Avoid contact with eyes',
            storageConditions: 'Store at room temperature',
            approvalDate: '2022-09-01',
            expiryDate: '2024-09-01',
            batchNumber: 'B009',
            description: 'Moisturises and relieves dry skin conditions'
        },
        {
            id: 100000010,
            brandName: 'NasoSpray',
            genericName: 'Fluticasone',
            manufacturer: 'AllerFree',
            activeIngredients: 'Fluticasone 50 mcg/spray',
            inactiveIngredients: 'Benzalkonium chloride, Phenylethyl alcohol',
            form: 'Spray',
            strength: '50 mcg/spray',
            dosage: '2 sprays in each nostril once daily',
            routeOfAdministration: 'Nasal',
            indications: 'Allergic rhinitis',
            contraindications: 'Untreated nasal infections',
            sideEffects: 'Nosebleed, Nasal dryness',
            interactions: 'Ritonavir',
            warnings: 'Do not use for more than 3 months without consulting a doctor',
            storageConditions: 'Store in a cool, dry place',
            approvalDate: '2021-12-01',
            expiryDate: '2023-12-01',
            batchNumber: 'B010',
            description: 'Relieves symptoms of allergic rhinitis'
        }
    ]
}
