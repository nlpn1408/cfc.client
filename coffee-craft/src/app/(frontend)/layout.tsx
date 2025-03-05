import Footer from '@/components/Footer'
import SiteHeader from '@/components/site-header'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
    // const session = await getServerSession(authOptions)
    return (
        <div>
            <SiteHeader session={null} />
            {children}
            <Footer />
        </div>
    )
}
