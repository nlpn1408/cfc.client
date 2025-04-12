'use client'
import React, { use, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import OrderPage from './Orderpage'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Separator } from "../ui/separator"
import type { UserProfile } from '@/types/types'
import { Avatar } from 'flowbite-react'
import { AvatarFallback, AvatarImage } from '../ui/avatar'

export default function UserProfile() {
  const params = useSearchParams()
  const page = params.get('page') ?? 'profile'
  const router = useRouter()
  const steps = [
    {
      title: 'Profile',
      page: 'profile',
      component: <Profile title='Profile' />
    },
    {
      title: 'Change Password',
      page: 'changepassword',
      component: <ChangePassword title='Change Password' page='changepasswod' description='' />
    },
    {
      title: 'OrderPage',
      page: 'oder',
      component: <OrderPage title='Order Page' page='order' description='' />
    }
  ]
  const currentStep = steps.find(step => step.page === page)
  const [user, setUser] = useState<UserProfile>()
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData: UserProfile = JSON.parse(storedUser);
      setUser(userData);
    }

  }, [])


  return (
    <section className='container lg:px-16 md:px-8 px-4 py-5'>
      <div className="grid grid-cols-4 gap-5">
        {/* Header */}
        <div className='col-span-full bg-slate-200 rounded-lg p-5'>
          <h1 className='text-4xl font-bold'>User Profile</h1>
          <div>
            <span onClick={() => router.push('/')} className='hover:text-slate-800 cursor-pointer'>Home</span> /
            <span className='hover:text-slate-800 cursor-pointer'>Dashboard</span>
          </div>
        </div>
      {/* {user && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user.imgUrl || undefined} />
                <AvatarFallback>{user?.name?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          )} */}

        <div className="lg:col-span-1 col-span-full flex lg:flex-col gap-3 divide-gray-200 h-full dark:bg-slate-900 p-4">

    
          {/* Danh sách bước */}
          <div className="flex lg:flex-col gap-3 w-full">
            {steps.map((step, i) => (
              <div key={i} className="py-1 w-full">
                <Link
                  href={`/dashboard/1?page=${step.page}`}
                  className={cn(
                    `block uppercase text-sm w-full bg-[#b98362] rounded-lg py-3 px-4 
             hover:bg-[#935027] hover:text-slate-100`,
                    step.page === page ? 'bg-[#5C3D2F] text-slate-100' : 'text-black'
                  )}
                >
                  {step.title}
                </Link>
                <Separator orientation="vertical" className="lg:block hidden" />
              </div>
            ))}
          </div>
        </div>

        {/* Nội dung hiển thị component */}
        <div className='lg:col-span-3 col-span-full border rounded-lg shadow-md'>
          {currentStep?.component}
        </div>
      </div>
    </section>
  );
}