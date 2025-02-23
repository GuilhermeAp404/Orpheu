import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

export default async function RouteProtector({children}:{children:ReactNode}) {
    const session = await getSession()
    
    if(session===null) redirect('/')

    return (
        <div>
            {children}
        </div>
    )
}
