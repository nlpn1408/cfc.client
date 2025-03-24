'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import OrderPage from './Orderpage'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { description } from '../Auth/Login'
import { Separator } from "../ui/separator"

export default function UserProfile({ id }: { id: string }) {
  const parmas = useSearchParams()
  const page = parmas.get('page') ?? 'profile'
  const router = useRouter()
  const [selectedComponent, setSelectedComponent] = useState('Profile')

  // Xác định component nào sẽ được hiển thị
  const steps = [
    {
      title: 'Profile',
      page: 'profile',
      component: <Profile userId={id} title='Profile' page='profile' description='' />
    },
    {
      title: 'Change Password',
      page: 'changepassword',
      component: <ChangePassword userId={id} title='Change Password' page='changepasswod' description='' />
    },
    {
      title: 'OrderPage',
      page: 'oder',
      component: <OrderPage userId={id} title='Order Page' page='order' description='' />
    }
  ]

  const currentStep = steps.find(step => step.page === page)

  return (
    <section className='max-w-screen-2xl container'>
      <div className="grid grid-cols-4 gap-5">
        {/* Header */}
        <div className='col-span-full bg-slate-200 rounded-lg p-5'>
          <h1 className='text-4xl font-bold'>User Profile</h1>
          <div>
            <span onClick={() => router.push('/')} className='hover:text-slate-800 cursor-pointer'>Home</span> /
            <span className='hover:text-slate-800 cursor-pointer'>Dashboard</span>
          </div>
        </div>

        <div className="lg:col-span-1 col-span-full flex lg:flex-col gap-3  divide-gray-200 h-full dark:bg-slate-900">
          {
            steps.map((step, i) => (
              <div key={i} className='py-1'>
                <Link
                  href={`/dashboard/1?page=${step.page}`}
                  className={cn(`block uppercase text-sm lg:col-span-full bg-[#b98362] rounded-lg col-span-1 py-3 px-4
                  hover:bg-[#935027] hover:text-slate-100`,
                    step.page === page ? 'bg-[#5C3D2F] text-slate-100' : 'text-black')}
                >
                  {step.title}
                </Link>
                <Separator orientation="vertical" className='lg:block hidden' />
              </div>
            ))}
        </div>

        {/* Nội dung hiển thị component */}
        <div className='lg:col-span-3 col-span-full border rounded-lg shadow-md'>
          {currentStep?.component}
        </div>
      </div>
    </section>
  )
}
