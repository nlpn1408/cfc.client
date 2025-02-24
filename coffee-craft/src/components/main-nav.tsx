"use client"

import Link from "next/link"

export default function MainNav() {


    return (
        <div className="mr-4 hidden md:flex justify-center items-center gap-6">
            <Link href='/' className="hover:text-gray-900 transition text-2xl font-bold">
                Coffee <span className="text-orange-300">Cart</span>
            </Link>
            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 text-gray-700">
                <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
                    <Link href="/" className="hover:text-gray-900 transition">
                        Home
                    </Link>
                    <Link href="/all-products" className="hover:text-gray-900 transition">
                        Shop
                    </Link>
                    <Link href="/" className="hover:text-gray-900 transition">
                        About Us
                    </Link>
                    <Link href="/" className="hover:text-gray-900 transition">
                        Contact
                    </Link>

                </div>
            </nav>
        </div>
    )
}