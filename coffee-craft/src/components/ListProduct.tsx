import React from 'react'
import ProductCard from './ProductCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { productsDummyData } from '../../data/db'

const data = [
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product2.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product2.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product2.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product2.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product2.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product2.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product1.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product1.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product1.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product1.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },
    {
        title: 'Product 1',
        image1: '/product/product4.png',
        image2: '/product/product1.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    },

]

export default function ListProduct() {
    return (
        <section className='container  max-w-screen-2xl py-10'>
            <h1 className='text-center text-3xl font-extrabold underline pb-10'>Featured</h1>
            <div className='flex p-3'>
                <div className="flex-1">Category</div>
                <Link href='#' className='text-xl text-slate-600 hover:text-slate-700'>Show more </Link>
            </div>
            <Carousel
                opts={{
                    align: "start",
                }}>
                <CarouselContent>
                    {productsDummyData.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Card>
                                <CardContent className="gird grid-cols-4 gap-2">
                                    <ProductCard 
                                    title={item.name} 
                                    image1={item.image} 
                                    image2='' 
                                    price={item.price} 
                                    link={item._id} 
                                    rating={item.category} />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='hidden md:flex items-center justify-center ' />
                <CarouselNext className='hidden md:flex items-center justify-center ' />
            </Carousel>
        </section>
    )
}
