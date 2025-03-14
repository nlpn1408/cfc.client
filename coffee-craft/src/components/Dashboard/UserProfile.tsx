'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function UserProfile() {

  const router = useRouter()

  return (
    <section className='max-w-screen-2xl container'>
      <div className="grid grid-cols-4 gap-5">
        <div className='col-span-full bg-slate-200 rounded-lg p-5'>
          <h1 className=' text-4xl font-bold'>User Profile</h1>
          <div className="">
            <span onClick={(e) => router.push('/')} className='hover:text-slate-800'>Home </span>/<span className='hover:text-slate-800'>Dashboard</span>
          </div>

        </div>
        <div className="col-span-1 grid grid-rows-5 gap-2 shadow-lg">
          <Button className='bg-transparent text-slate-800 hover:text-slate-400'>
            <Link href='#'>Profile</Link>
          </Button>
          <Button className='bg-transparent text-slate-800 hover:text-slate-400'>
            <Link href='#'>Change Password</Link>
          </Button>
          <Button className='bg-transparent text-slate-800 hover:text-slate-400'>
            <Link href='#'>History Bought</Link>
          </Button>
          <Button className='bg-transparent text-slate-800 hover:text-slate-400'>
            <Link href='#'>Setting</Link>
          </Button>
          <Button className='bg-transparent text-slate-800 hover:text-slate-400'>
            <Link href='#'>Profile</Link>
          </Button>
        </div>
        <div className='col-span-3'>
          <p>Hello, <span className='font-bold'>John Doe</span></p>
        </div>
      </div>
    </section>
  )
}
