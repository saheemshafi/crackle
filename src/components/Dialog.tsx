"use client"

import { toastOptions } from '@/lib/utlities/toast';
import { useRouter } from 'next/navigation';
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { BiCheck, BiErrorAlt } from 'react-icons/bi';
import { HiOutlineDownload } from 'react-icons/hi';
import { VscClose } from "react-icons/vsc"
import * as uuid from "uuid";

interface DialogProps {
    children: React.ReactNode
    width: string
    height: string
    url: string
}

const Dialog: FC<DialogProps> = ({ children, height, width, url }) => {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [downloading, setDownloading] = useState(false);

    async function downloadImage(
        path: string,
        width: string,
        height: string
    ) {
        if (typeof document == "undefined") return;
        const request = fetch(
            `/api/og?path=${path.slice(1).split(".")[0]
            }&width=${width}&height=${height}&ext=${path.split(".")[1]}`
        ).then((res) => res.blob());

        const blob = await toast.promise(
            request,
            {
                error: (
                    <div className="flex items-center gap-2">
                        <BiErrorAlt className="mr-3 text-brand" size={20} /> Oops! Something
                        went wrong.
                    </div>
                ),
                loading: (
                    <div className="flex flex-col">
                        <div className="flex w-full items-center gap-2">
                            <div className="aspect-square h-4 w-4 animate-spin rounded-full border-2 border-r-transparent "></div>
                            Starting Download...
                        </div>
                        <p className="mt-1 block text-sm text-gray-light">
                            Large images might take some time to download
                        </p>
                    </div>
                ),
                success: (
                    <div className="flex items-center gap-2">
                        <BiCheck size={20} className="animate-in mr-3 text-brand" /> Download
                        Started!
                    </div>
                ),
            },
            { ...toastOptions, icon: null }
        );

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `crackle-${uuid.v1()}.${path.split(".")[1]}`;
        anchor.click()
        anchor.remove()
    }

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick = useCallback(
        (e: MouseEvent) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper]
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            className="fixed z-[100] left-0 right-0 top-0 bottom-0 mx-auto bg-black/80 backdrop-blur-sm"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 p-3"
            >
                <div className='flex py-2'>
                    <div className='flex ml-auto gap-2'>
                        <button aria-label='Download Image' className='hidden md:grid border border-white w-[33px] h-[33px] text-white hover:opacity-90 p-1 rounded-full place-items-center ml-auto' onClick={async () => {
                            try {
                                setDownloading(true);
                                await downloadImage(`/${url}`, width, height);
                            } catch (error) {
                                toast.error("Oops! Something Went Wrong", {
                                    ...toastOptions,
                                    icon: <BiErrorAlt className="text-brand" size={20} />,
                                });
                            } finally {
                                setDownloading(false);
                            }
                        }}>{downloading ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-r-transparent "></div>
                        ) : (
                            <HiOutlineDownload size={24} />
                        )}

                        </button>
                        <button aria-label='Close Image Preview' className='border border-white text-white hover:opacity-90 p-1 rounded-full grid place-items-center' onClick={() => onDismiss()}><VscClose size={24} /></button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Dialog