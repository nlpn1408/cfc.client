import React from 'react'
import { Button } from '../ui/button'

export default function Banner() {
    return (
        <section className=''>
            <div className='w-full h-full bg-[url(/banner/banner1.png)] bg-no-repeat bg-cover bg-center'>
                <div className='container max-w-screen-2xl py-20 grid grid-cols-3'>
                    <div className='col-span-3 md:col-span-1 flex flex-col lg:gap-20 gap-5'>
                        <h1 className='text-7xl font-extrabold'>
                            <span className='text-orange-300'>Coffee</span> Cart
                        </h1>
                        <p className='text-white'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
                            quibusdam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,

                            quibusdam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,

                        </p>
                        <Button className='text-white font-bold py-2 px-4 rounded'>
                            askdlajd
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
