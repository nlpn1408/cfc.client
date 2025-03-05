"use client"
import React from 'react'
import MainNav from './main-nav'
import { CommandMenu } from './command-menu'
import ModeToggle from './ModeToggle'
import {
    LogIn,
    LogOut,
    ShoppingBagIcon
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu'
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from './ui/avatar'
import Link from 'next/link'
import { MobileNav } from './mobile-nav'
import { Button } from './ui/button'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function SiteHeader({ session }: { session: Session | null }) {
    const user = session?.user;
    const router = useRouter();
    async function handleLogout() {
        await signOut();
        router.push("/login");
    }
    return (
        <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-around">

                <MainNav />
                <MobileNav />
                <div className='flex justify-end flex-1 items-center gap-2'>
                    <CommandMenu />
                    {/* Login */}
                    {session && session.user && user?.email
                        ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="rounded-full">
                                        <Avatar>
                                            {user.image ? (
                                                <AvatarFallback>{/*{user.name}*/}</AvatarFallback>
                                            ) : (
                                                <AvatarImage src="/avatars/01.png" />
                                            )}
                                        </Avatar>
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><Link href='/dashboard'>Dashboard</Link></DropdownMenuItem>
                                    <DropdownMenuItem>Support</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleLogout()}>Logout <LogOut size={15} className="ml-2" /></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button asChild>
                                <Link href="/login">
                                    Login<LogIn size={16} className="" />
                                </Link>
                            </Button>
                        )}
                    <Link href='/cart'>
                        <ShoppingBagIcon size={34} />
                    </Link>
                    <nav className='lg:block hidden' >
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
