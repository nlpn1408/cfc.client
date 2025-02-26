"use client"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const HeroData = [
    {
        id: 1,
        title: 'New Arrivals',
        image: '/product/product1.png',
        link: '#',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
    },
    {
        id: 2,
        title: 'Best Sellers',
        image: '/product/product2.png',
        link: '#',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

    },
    {
        id: 3,
        title: 'Featured',
        image: '/product/product3.png',
        link: '#',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

    },

]

export default function Hero() {
    return (
        <section className='container max-w-screen-2xl'>
            <div className='grid grid-cols-12 items-center gap-6 pb-8 pt-3 md:py-5'>
                <div className='col-span-full lg:col-span-4 flex py-5 px-5 items-end space-y-4 relative bg-[url(/hero/hero1.png)] h-[500px] bg-cover bg-left bg-no-repeat rounded-lg shadow-lg'>
                    <Link href='#' className='flex text-end text-3xl font-bold text-[#412017]'> Shop now <ArrowRight size={40} /> </Link>
                </div>
                <div className='col-span-full lg:col-span-8 grid grid-rows-2 grid-cols-4 gap-5'>
                    {HeroData.map(item => (
                        <Link href='#' key={item?.id} className='col-span-full md:col-span-2 lg:col-span-2 flex justify-around space-y-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'>
                            <div className='flex flex-col space-y-4 justify-around py-4 px-6'>
                                <h1 className='text-3xl font-bold '>
                                    {item?.title}
                                </h1>
                                <p className='text-sm '>
                                    {item?.description}
                                </p>
                                <h2 className='flex text-sm '>
                                    Shop now <ArrowRight size={20} />
                                </h2>
                            </div>
                            <img src={item.image} alt={item?.title} className='w-[200px] h-[200px] object-contain' />
                        </Link>
                    ))}
                    <Link href='#' className='col-span-full md:col-span-2 lg:col-span-2 hover:scale-105 transition-all duration-300 ease-in-out bg-[url(/hero/hero2.png)] h-[240px] bg-left bg-no-repeat rounded-lg shadow-lg'>
                        <div className='grid grid-cols-3 gap-5'>

                            <div className=' col-span-2 flex flex-col space-y-10 justify-around text-white px-5 py-5'>
                                <h1 className='text-3xl font-bold '>
                                    Lorem Ipsum
                                </h1>
                                <p className='text-sm '>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                                <h2 className='flex text-sm '>
                                    Shop now <ArrowRight size={20} />
                                </h2>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    )
}
