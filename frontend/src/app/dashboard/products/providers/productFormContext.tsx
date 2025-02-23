'use client'
import useCategories from '@/hooks/useCategories'
import api from '@/lib/api'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface ProductContextProducts{
    isVisible:boolean
    product:ProductProps|null
    categories:CategoryProps[]|undefined
    handleVisible:()=>void
    getProduct:(product:ProductProps)=>void
}
export const ProductFormContext = createContext({} as ProductContextProducts)

export function ProductFormProvider({children}:{children:ReactNode}) {
    const {status}=useSession()
    const {getCategories} = useCategories()
    const [isVisible, setIsVisible]=useState<boolean>(false)
    const [product, setProduct]=useState<ProductProps|null>(null)
    const [categories, setCategories]=useState<CategoryProps[]>([])

    useEffect(()=>{
        async function fillCategories() {
            const categoriesList = await getCategories()
            setCategories(categoriesList)
        }

        if(status==='authenticated') fillCategories()
    }, [status])

    function handleVisible(){
        if(!isVisible) setIsVisible(true)
        if(isVisible){
            setProduct(null)
            setIsVisible(false)
        }             
    }

    function getProduct(product:ProductProps){
        setProduct(product)
        setIsVisible(true)
    }

    return (
        <ProductFormContext.Provider value={{ isVisible, product, categories, handleVisible, getProduct}}>
            {children}
        </ProductFormContext.Provider>
    )
}
