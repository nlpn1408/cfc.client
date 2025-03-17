'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import HistoryBought from './HistoryBought'
import Setting from './Setting'


export default function UserProfile() {
  const router = useRouter()
  const [selectedComponent, setSelectedComponent] = useState('Profile')

  // Xác định component nào sẽ được hiển thị
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Profile':
        return <Profile />
      case 'ChangePassword':
        return <ChangePassword />
      case 'HistoryBought':
        return <HistoryBought />
      case 'Setting':
        return <Setting />
      default:
        return <Profile />
    }
  }

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

        {/* Sidebar */}
        <div className="col-span-1 grid grid-rows-5 gap-2 ">
          <Button onClick={() => setSelectedComponent('Profile')} className='bg-transparent text-slate-800 hover:text-slate-400'>
            Profile
          </Button>
          <Button onClick={() => setSelectedComponent('ChangePassword')} className='bg-transparent text-slate-800 hover:text-slate-400'>
            Change Password
          </Button>
          <Button onClick={() => setSelectedComponent('HistoryBought')} className='bg-transparent text-slate-800 hover:text-slate-400'>
            History Bought
          </Button>
          <Button onClick={() => setSelectedComponent('Setting')} className='bg-transparent text-slate-800 hover:text-slate-400'>
            Setting
          </Button>
        </div>

        {/* Nội dung hiển thị component */}
        <div className='col-span-3 p-5 border rounded-lg shadow-md'>
          {renderComponent()}
        </div>
      </div>
    </section>
  )
}
