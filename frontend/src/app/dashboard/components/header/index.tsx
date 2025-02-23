'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { AlignJustify, CircleUser, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const menuLinks=[
    {label:'Home', href:'/dashboard'},
    {label:'Categorias', href:'/dashboard/categories'},
    {label:'Produtos', href:'/dashboard/products'},
    {label:'Fornecedores', href:'/dashboard/suppliers'},
    {label:'Clientes', href:'/dashboard/customers'},
    {label:'Pedidos', href:'/dashboard/orders'},
]

export default function Header() {
    const {data: session} = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const [scroll, setScroll] = useState(false)

    function toggleMenu(){
        setIsOpen(!isOpen)
    }
    
    const scrollHandler = ()=>{
        window.scrollY>10 ? setScroll(true):setScroll(false)
    }


    useEffect(()=>{
        window.addEventListener('resize', ()=>setIsOpen(false))
        window.addEventListener('scroll', scrollHandler)
        
        const navLink = document.querySelectorAll('nav ul li a')
        navLink.forEach((e)=> e.addEventListener('click',()=>setIsOpen(false)))
        
        return ()=>{
            window.addEventListener('resize', ()=>setIsOpen(false))
            navLink.forEach((e)=> e.addEventListener('click',()=>setIsOpen(false)))
        }
    }, [scroll || isOpen])

    return(
        <header className={`${styles.header}  ${scroll?(styles.onScroll):("")}`}>
            <div className={styles.menuButton} onClick={()=> toggleMenu()}>
                {isOpen ? (<X size={34} color='#3D3D3D'/>)
                :(<AlignJustify size={34} color='#3D3D3D'/>)}
                
            </div>
            <div className={styles.profile}>
                <span>{session?.user.name}</span>
                <CircleUser size={34}/>
            </div>
            <nav className={`${styles.menu} ${isOpen?(styles.open):("")}`}>
                <ul>
                    {menuLinks.map((link)=>(
                        <li key={link.label}>
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button onClick={()=>signOut()} className={styles.logout}>
                            Sair
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
