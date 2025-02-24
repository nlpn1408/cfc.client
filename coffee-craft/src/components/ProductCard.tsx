import React from 'react'
import Link from 'next/link'
import { HeartIcon, ShoppingBag, ShoppingCart, Star, StarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCardProps } from '@/types/nav';

export default function ProductCard({ rating, title, image1, image2, price, link }: ProductCardProps) {
    return (
        <div className='p-6 group relative'>
            <div className='group/item rounded-lg shadow-md p-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300'>
                <Link href={`/product/${link}`}>
                    <div className='flex items-center'>
                        <p className='mr-3'>
                            {rating}
                        </p>
                        <StarIcon key={Math.random() * 1000} size={15} fill='yellow' className='text-yellow-400' />
                    </div>
                    <div className='w-[200px] h-[200px] '>
                        <img src={image2} alt={title}
                            className='group-hover/item:hidden w-[80%] h-[80%] object-contain rounded-lg' />
                        <img src={image1} alt={title}
                            className='hidden group-hover/item:block w-[80%] h-[80%] object-contain rounded-lg' />
                    </div>
                    <div>
                        <p className='pt-5 text-xs capitalize text-slate-600'>{title}</p>
                        <h1 className='text-lg cursor-pointer hover:text-blue-500 transition-all hover:underline 
                    sm:w-full sm:truncate mt-2 text-black font-semibold'>{title}</h1>
                        <h2 className='text-base hover:text-red-400'>$ {price}</h2>
                    </div>
                </Link>
                <div className='hidden gap-3 group-hover:flex flex-col top-10 right-3 absolute transition-all duration-300 ease-linear
                transform -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'>
                    <Button className=' rounded-full px-2 py-3'>
                        <ShoppingBag size={16} />
                    </Button>
                    <Button className=' rounded-full px-2 py-3'>
                        <HeartIcon size={16} />
                    </Button>
                    <Button className=' rounded-full px-2 py-3'>
                        <ShoppingCart size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
