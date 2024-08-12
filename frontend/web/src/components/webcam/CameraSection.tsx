'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Product } from '@/components/products/ProductColumns'

interface DataTableProps {
    onRowClick: (row: Product) => void
    data: Product[]
}
interface PredictionResult {
    predictions: string; // The type of prediction result
}

const CameraSection: FC<DataTableProps> = ({ onRowClick, data }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const photoRef = useRef<HTMLCanvasElement>(null)
    const [tookPhoto, setTookPhoto] = useState<boolean>(false)
    const [hasFound, setHasFound] = useState<boolean>(false)
    const [clearImage, setClearImage] = useState<boolean>(false)
    const [foundProduct, setFoundProduct] = useState<Product | null>(null)
    const router = useRouter()
    const [imageBase64, setImageBase64] = useState<string>('');

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
        if (!videoRef.current || !photoRef.current) return;
    
        const width = 500;
        const height = width / (16 / 9);
        const photo = photoRef.current;
        const video = videoRef.current;
        photo.width = width;
        photo.height = height;
    
        const ctx = photo.getContext('2d');
        if (ctx) {
            ctx.translate(photo.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(video, 0, 0, photo.width, photo.height);
        }
        const imageData = photo.toDataURL('image/png');
        setImageBase64(imageData);  // Store the image
        setTookPhoto(true);
    };

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

    const queryClient = useQueryClient();
    const { mutateAsync: searchImageMutation } = useMutation<PredictionResult, Error, { image: string }>({
        mutationFn: async ({ image }: { image: string }) => {
            try {
                const res = await fetch('/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image }),
                });
    
                const data = await res.json();
                if (!res.ok || data.error) throw new Error(data.error || 'Failed to send the image');
    
                return data as PredictionResult;  // Explicitly specify the return data type
            } catch (error) {
                throw new Error('error');
            }
        },
    });

    const searchImage = async () => {
    try {
        const result = await searchImageMutation({ image: imageBase64 });  // Pass the image data
        const product = result.predictions;  // Extract the prediction result from the returned data

        // Further processing
        const matchedProduct = data.find(item => item.productName === product);
        if (matchedProduct) {
            setFoundProduct(matchedProduct);
            setHasFound(true);
        }
        setTookPhoto(false);
    } catch (error) {
        console.log(error);
    }
};

    const seeProductDetail = () => {
        if (foundProduct) {
            onRowClick(foundProduct)
        }
    }

    const deleteCurrentImage = () => {
        setClearImage(true)
        setHasFound(false)
        setTookPhoto(false)
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
            <div className='w-full md:w-2/6 h-full flex flex-col pr-3 md:mr-3'>
                <div className='flex flex-col justify-between w-full h-full p-4 ml-3 rounded-3xl bg-background shadow-lg overflow-hidden'>
                    <div className='w-full h-full rounded-2xl border border-primary/70 border-dashed flex justify-center items-center'>
                        {hasFound ?
                            <Image src='/images/default-product.png' alt='image' className='rounded-2xl' width={100} height={500} />
                            :
                            <canvas ref={photoRef} className='w-full h-full rounded-2xl object-cover'></canvas>
                        }
                    </div>
                    {foundProduct && (
                        <div className='p-4 mt-4 bg-white rounded-2xl shadow-md'>
                            <h3 className='text-lg font-semibold'>{foundProduct.productName}</h3>
                            <p><strong>ID:</strong> {foundProduct.id}</p>
                            <p><strong>Brand Name:</strong> {foundProduct.brandName}</p>
                            <p><strong>Generic Name:</strong> {foundProduct.genericName}</p>
                            <p><strong>Manufacturer:</strong> {foundProduct.manufacturer}</p>
                            <p><strong>Price:</strong> ${foundProduct.price.toFixed(2)}</p>
                        </div>
                    )}
                </div>
                <div className='w-full flex justify-evenly mt-10 ml-3'>
                    <Button size='lg' onClick={searchImage} disabled={!tookPhoto} className='p-6 md:p-10 rounded-xl md:rounded-2xl'>
                        Search
                    </Button>
                    {hasFound && (
                        <Button size='lg' onClick={seeProductDetail} className='p-6 md:p-10 rounded-xl md:rounded-2xl bg-impact'>
                            See detail
                        </Button>
                    )}
                    {(tookPhoto || hasFound) && (
                        <Button size='lg' onClick={deleteCurrentImage} className='p-6 md:p-10 rounded-xl md:rounded-2xl'>
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CameraSection
