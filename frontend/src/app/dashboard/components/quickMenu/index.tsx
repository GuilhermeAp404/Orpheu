'use client'
import { ClipboardList, Handshake, HeartHandshake, Layers2, Package } from 'lucide-react'
import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'

const menuLinks=[
    {icon:<Layers2 />, label:"Categorias", link:'/dashboard/categories'},
    {icon:<Package />, label:"Produtos", link:'/dashboard/products'},
    {icon:<Handshake />, label:"Fornecedores", link:'/dashboard/suppliers'},
    {icon:<HeartHandshake />, label:"Clientes", link:'/dashboard/customers'},
    {icon:<ClipboardList />, label:"Pedidos", link:'/dashboard/orders'}
]

export default function QuickMenu() {
    const router = useRouter()

    function redirectTo(link:string){
        router.push(link)
    }

    return(
        <div className={styles.quickMenu}>
            {menuLinks.map((link)=>(
                <div className={styles.box} key={link.label} onClick={()=> redirectTo(link.link)}>
                    {link.icon}
                    <span>{link.label}</span>
                </div>
            ))}
        </div>
    )
}
