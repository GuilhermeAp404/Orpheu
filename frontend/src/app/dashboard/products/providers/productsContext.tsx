'use client'
import useProducts from '@/hooks/useProducts'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useState, createContext, useEffect, ChangeEvent } from 'react'

interface ProductContextData{
    foundProducts:ProductProps[]
    filterOnChange:(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>void
    clearFilter:()=>void
    doAFilter:()=>void
}

interface FilterProps{
    productName:string
    category:string
}

export const ProductsContext = createContext({} as ProductContextData)

export function ProductsContextProvider({children}:{children:ReactNode}) {
    const {getProducts} = useProducts()
    const {status} = useSession()
    const [products, setProducts] = useState<ProductProps[]>([])
    const [foundProducts, setFoundProducts] = useState<ProductProps[]>([])
    const [filter, setFilter] = useState<FilterProps>({} as FilterProps)

    useEffect(()=>{
        async function fillProducts(){
            const productsList = await getProducts()
            setProducts(productsList)
            setFoundProducts(productsList)
        }

        if(status==='authenticated') fillProducts()
    }, [ status])


    function filterOnChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>){
        const {name, value} = event.target
        setFilter((prev)=>({...prev, [name]:value}))
    }

    function doAFilter() {
        const ativos = Object.keys(filter).filter((key) => filter[key as keyof FilterProps]);
    
        const resultado = products.filter((p) =>
            ativos.every((key) => {
                const filterValue = filter[key as keyof FilterProps]?.toString().toLowerCase();
                
                const productValue = key === 'category' ? (
                    p.category?.categoryName.toLowerCase()
                ):(
                    p[key as keyof ProductProps]?.toString().toLowerCase()
                )

                return productValue?.includes(filterValue)
            })
        )
        setFoundProducts(resultado);
    }

    function clearFilter(){
        setFoundProducts(products)
    }

    return (
        <ProductsContext.Provider value={{foundProducts, clearFilter, filterOnChange, doAFilter}}>
            {children}
        </ProductsContext.Provider>
    )
}
