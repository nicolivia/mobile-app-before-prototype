'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Product } from '@/components/products/ProductColumns'

interface DataTableProps {
    onRowClick: (row: Product) => void
    data: Product[]
}

const CameraSection: FC<DataTableProps> = ({ onRowClick, data }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const photoRef = useRef<HTMLCanvasElement>(null)
    const [hasFound, setHasFound] = useState<boolean>(false)
    const [clearImage, setClearImage] = useState<boolean>(false)
    const [foundProduct, setFoundProduct] = useState<Product | null>(null)
    const productID = 1000000001

    const getUserCamera = () => {
        setHasFound(false)
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                    videoRef.current.play()
                }
            })
            .catch(error => {
                console.error('Error accessing camera:', error)
            })
    }

    const takePhoto = () => {
        setHasFound(false)
        if (!videoRef.current || !photoRef.current) return

        const width = 500
        const height = width / (16 / 9)
        const photo = photoRef.current
        const video = videoRef.current
        photo.width = width
        photo.height = height

        const ctx = photo.getContext('2d')
        if (ctx) {
            ctx.translate(photo.width, 0)
            ctx.scale(-1, 1)
            ctx.drawImage(video, 0, 0, photo.width, photo.height)
        }
    }

    useEffect(() => {
        getUserCamera()

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream
                const tracks = stream.getTracks()
                tracks.forEach(track => track.stop())
                videoRef.current.srcObject = null
            }
        }
    }, [videoRef])

    const searchImage = () => {
        setHasFound(true)
        const product = data.find(item => item.id === productID)
        if (product) {
            setFoundProduct(product)
        }
    }

    const seeProductDetail = () => {
        if (foundProduct) {
            onRowClick(foundProduct)
        }
    }

    const deleteCurrentImage = () => {
        setClearImage(true)
        setHasFound(false)
        setFoundProduct(null)
        if (photoRef.current) {
            const ctx = photoRef.current.getContext('2d')
            if (ctx) {
                ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height)
            }
        }
    }

    return (
        <div className='flex md:flex-row flex-col'>
            <div className='w-full md:w-4/6 pr-2 md:mr-2'>
                <div className='w-full mx-2 bg-white rounded-3xl shadow-lg'>
                    <video
                        className='container w-full py-7'
                        ref={videoRef}
                        style={{ transform: 'scaleX(-1)' }}
                    ></video>
                </div>
                <div className='w-full flex justify-center my-10'>
                    <Button size='lg' onClick={takePhoto} className={`${clearImage ? 'active' : 'deactive'} p-6 md:p-10 rounded-xl md:rounded-2xl`}>Take photo</Button>
                </div>
            </div>
            <div className='w-full md:w-2/6 flex flex-col pr-3 md:mr-3'>
                <div className='flex flex-col justify-between w-full h-full p-4 ml-3 rounded-3xl bg-background shadow-lg overflow-hidden'>
                    <div className='w-full h-auto rounded-2xl border border-primary border-dashed flex justify-center items-center'>
                        {hasFound ?
                            <Image src='/images/default-product.png' alt='image' className='rounded-2xl' layout='responsive' width={100} height={100} />
                            :
                            <canvas ref={photoRef} className='w-full h-full rounded-2xl'></canvas>
                        }
                    </div>
                </div>
                <div className='w-full flex justify-evenly mt-10 ml-3'>
                    <Button size='lg' onClick={searchImage} className='p-6 md:p-10 rounded-xl md:rounded-2xl'>Search</Button>
                    {hasFound && (
                        <Button size='lg' onClick={seeProductDetail} className='p-6 md:p-10 rounded-xl md:rounded-2xl'>See detail</Button>
                    )}
                    <Button size='lg' onClick={deleteCurrentImage} className='p-6 md:p-10 rounded-xl md:rounded-2xl'>Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default CameraSection
