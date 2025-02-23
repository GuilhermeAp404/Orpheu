'use client'
import React, { createContext, ReactNode, useState } from 'react'
import SupplierModal from '../suppliers/components/supplierModal'


interface ModalSupplierData{
    isVisible:boolean
    handleVisible:()=>void
    handleSupplier: (supplier:SupplierProps)=> void
}

export const ModalSupplierContext = createContext({} as ModalSupplierData)

export const ModalSupplierProvider = ({children}:{children:ReactNode})=>{
    const [isVisible, setIsVisible] = useState(false)
    const [supplier, setSupplier] = useState<SupplierProps|null>(null)
    
    function handleVisible(){
        setIsVisible(!isVisible)
        if(!isVisible){
            setSupplier(null)
        }
    }

    function handleSupplier(supplier:SupplierProps){
        setSupplier(supplier)
        setIsVisible(true)
    }
    
    return (
        <ModalSupplierContext.Provider value={{isVisible, handleVisible, handleSupplier}}>
            {isVisible && <SupplierModal />}
            {(isVisible && supplier) && <SupplierModal supplier={supplier}/>}
            {children}
        </ModalSupplierContext.Provider>
    )
}
