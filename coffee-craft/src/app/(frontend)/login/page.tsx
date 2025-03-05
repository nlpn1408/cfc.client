import Login from '@/components/Auth/Login'
// import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  // const session = await getServerSession(authOptions)
  return (
    <div className=''>
      <Login />
    </div>
  )
}
