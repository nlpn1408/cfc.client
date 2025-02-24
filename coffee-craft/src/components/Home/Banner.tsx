import React from 'react'
import { Button } from '../ui/button'

export default function Banner() {
    return (
        <section>
            <div className='bg-[url(/banner/banner1.png)] bg-cover bg-right bg-no-repeat rounded-lg shadow-lg' >
                <div className='container max-w-screen-2xl py-20 grid grid-cols-3'>
                    <div className='col-span-1 flex flex-col gap-20'>
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
