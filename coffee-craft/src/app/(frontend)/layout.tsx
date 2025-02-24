import Footer from '@/components/Footer'
import SiteHeader from '@/components/site-header'
import React, { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <SiteHeader />
            {children}
            <Footer />
        </div>
    )
}
