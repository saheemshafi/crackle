import Dialog from '@/components/Dialog'
import Image from 'next/image'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface pageProps {
    params: { url: string }
    searchParams: { w: string, h: string }
}

const page: FC<pageProps> = ({ params, searchParams }) => {
    return (<Dialog url={params.url} width={searchParams.w} height={searchParams.h}>
        <div className='w-full'>
            <div className='w-full aspect-video'>
                <Image alt='image-preview' src={`https://image.tmdb.org/t/p/original/${params.url}`} width={1200} height={800} className={twMerge('w-full object-cover shadow aspect-video', params.url.includes("png") ? "object-contain" : "")} />
            </div>
        </div>
    </Dialog>)
}

export default page