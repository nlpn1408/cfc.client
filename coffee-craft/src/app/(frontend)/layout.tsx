import Footer from '@/components/Footer'
import SiteHeader from '@/components/site-header'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    // const session = await getServerSession(authOptions)
    return (
        <div>
            <SiteHeader />
            {children}
            <Footer />
        </div>
    )
}
