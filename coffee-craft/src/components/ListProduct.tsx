import React from 'react'
import ProductCard from './ProductCard'

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
        image2: '/product/product2.png',
        price: 100,
        link: '/product/1',
        rating: '5.0'
    }]

export default function ListProduct() {
    return (
        <section className='container max-w-screen-2xl py-10'>
            <h1 className='text-center text-3xl font-extrabold underline pb-10'>Featured</h1>
            <div className='grid grid-cols-5 grid-rows-2 gap-3 py-4'>
                {data.map((item, index) => (
                    <ProductCard key={index} title={item.title} image1={item.image1} image2={item.image2} price={item.price} link={item.link} rating={item.rating} />
                ))}
                
            </div>
        </section>
    )
}
