'use client'

import { FC, useEffect, useRef } from 'react'
import { Button } from '../ui/button'

const CameraSection: FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const photoRef = useRef<HTMLCanvasElement>(null)

    const getUserCamera = () => {
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
    }, [videoRef])

    return (
        <div className='flex'>
            <div className='w-4/5 h- mx-2'>
                <div className='w-full mx-2 bg-white rounded-3xl shadow-lg'>
                    <video
                        className='container w-full py-7'
                        ref={videoRef}
                        style={{ transform: 'scaleX(-1)' }}
                    ></video>
                </div>
                <div className='w-full flex justify-center mt-10'>
                    <Button size='lg' onClick={takePhoto} className='p-10 rounded-2xl'>Take photo</Button>
                </div>
            </div>
            <div className='w-1/5 h-full rounded-3xl ml-3 bg-white/50'>
                <canvas ref={photoRef} className='w-60 h-40 rounded-2xl'></canvas>
            </div>
        </div>
    )
}

export default CameraSection
