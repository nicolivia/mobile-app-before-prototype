import { SideBar, HeaderMenu, BreadcrumbPath, ProductTable } from '@/components'
import { Product, columns } from '@/components/products/ProductColumns'

interface DashboardPageProps {
    data: Product[]
}

export default async function DashboardPage() {
    const data = await getData()

    return (
        <div className='bg-custom-gradient w-full h-screen flex items-center justify-even overflow-hidden p-3'>
            <SideBar />

            <div className="ml-4 flex-grow h-full relative">
                <HeaderMenu />
                <div className='pt-24 ml-4'>
                    <BreadcrumbPath />
                    <ProductTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    )
}

async function getData(): Promise<Product[]> {
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