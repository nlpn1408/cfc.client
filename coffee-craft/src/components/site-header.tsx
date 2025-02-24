"use client"
import React, { useEffect, useState } from 'react'
import MainNav from './main-nav'
import { CommandMenu } from './command-menu'
import ModeToggle from './ModeToggle'
import { ShoppingBagIcon, User } from 'lucide-react'
import { MobileNav } from './mobile-nav'
import Link from 'next/link'

export default function SiteHeader() {

    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-around">

                <MainNav />
                <MobileNav />
                <div className='flex justify-end flex-1 items-center gap-2'>
                    <CommandMenu />
                    {/* Login */}
                    <User size={34} />
                    <Link href='/cart'>
                        <ShoppingBagIcon size={34} />
                    </Link>
                    <nav hidden>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
