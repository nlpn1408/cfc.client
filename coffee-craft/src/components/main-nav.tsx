"use client"

import Link from "next/link"

export default function MainNav() {


    return (
        <div className=" hidden md:flex justify-center items-center lg:gap-6 md:gap-5">
            <Link href='/' className="hover:text-gray-900 transition lg:text-2xl md:text-xl font-bold">
                Coffee<span className="text-orange-300">Craft</span>
            </Link>
            <nav className="flex items-center justify-between px-4 md:px-2 lg:px-32 py-3 text-gray-700">
                <div className="flex items-center gap-3 lg:gap-8 max-md:hidden">
                
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