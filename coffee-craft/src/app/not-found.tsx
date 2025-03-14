"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
export default function NotFound() {

    const pathname = usePathname().split('/').filter(Boolean).pop()

    const handleBack = () => {
        window.history.back()
    }

    return (
        <main className=''>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
                <div className="max-w-screen-2xl mx-auto  text-center">
                    <div className="boo-wrapper">
                        <div className="boo">
                            <div className="face"></div>
                        </div>
                        <div className="shadow1"></div>
                        <div className='space-y-5'>
                            <h1 className='text-5xl text-[#9b9b9b]'>Whoops!</h1>
                            <p className="text-[#9b9b9b] text-4xl font-semibold sm:text-5xl">
                                We couldn't find the page <span className='text-[#935027] uppercase'>{pathname}</span> <br /> were looking for.

                            </p>
                            <p className="text-gray-600">
                                Sorry, the page you are looking for could not be found or has been removed.
                            </p>
                            <button onClick={handleBack} className="text-[#935027] duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
                                Go back
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}