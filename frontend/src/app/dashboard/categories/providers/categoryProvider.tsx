'use client'
import useCategories  from '@/hooks/useCategories'
import api from '@/lib/api'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface CategoryProviderProps{
    categories:CategoryProps[]
    categoryToUpdate:CategoryProps|null
    getCategoryToUpdate:(id:number)=>void
    clearCategoryToUpdate:()=>void
}

export const CategoryContext = createContext({} as CategoryProviderProps)

export function CategoryProvider({children}:{children:ReactNode}) {
    const {status} = useSession()
    const {getCategories} = useCategories()
    const [categories, setCategories]=useState<CategoryProps[]>([])
    const [categoryToUpdate, setCategoryToUpdate]=useState<CategoryProps|null>(null)

    useEffect(()=>{
        async function fillCategories() {
            const categoriesList = await getCategories()  
            setCategories(categoriesList)
        }

        if(status === 'authenticated'){
            fillCategories()
        } 
    }, [status])

    function getCategoryToUpdate(id:number) {
        let category = categories.find((c)=> c.id === id)
        if(category){
            setCategoryToUpdate(category)
        }
    }

    function clearCategoryToUpdate() {
        setCategoryToUpdate(null)
    }

    return (
        <CategoryContext.Provider value={{categories, categoryToUpdate, getCategoryToUpdate, clearCategoryToUpdate}}>
            {children}
        </CategoryContext.Provider>
    )
}
