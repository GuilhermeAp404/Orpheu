'use client'
import { ClipboardCopy, ClipboardPaste } from 'lucide-react'
import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'

const menuLinks=[
    {icon:<ClipboardCopy />, label:"Para Fornecedor", subtitle: "Entrada de mercadoria", link:'/order/supplier/new'},
    {icon:<ClipboardPaste />, label:"Para Clientes", subtitle:"Saída de mercadoria",link:'/order/customer/new'}
]

export default function CreateOrderMenu() {
    const router = useRouter()

    function redirectTo(link:string){
        router.push(link)
    }

    return(
        <div className={styles.menu}>
            {menuLinks.map((link)=>(
                <div className={styles.box} key={link.label} onClick={()=> redirectTo(link.link)}>
                    {link.icon}
                    <div>
                        <span>{link.label}</span>
                        <p>{link.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
