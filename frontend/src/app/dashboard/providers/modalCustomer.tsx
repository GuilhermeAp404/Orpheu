'use client'
import React, { createContext, ReactNode, useState } from 'react'
import CustomerModal from '../customers/components/customerModal'


interface ModalCustomerData{
    isVisible:boolean
    handleVisible:()=>void
    handleCustomer: (customer:CustomerProps)=> void
}

export const ModalCustomerContext = createContext({} as ModalCustomerData)

export const ModalCustomerProvider = ({children}:{children:ReactNode})=>{
    const [isVisible, setIsVisible] = useState(false)
    const [customer, setCustomer] = useState<CustomerProps|null>(null)
    
    function handleVisible(){
        setIsVisible(!isVisible)
        if(!isVisible){
            setCustomer(null)
        }
    }

    function handleCustomer(customer:CustomerProps){
        setCustomer(customer)
        setIsVisible(true)
    }
    
    return (
        <ModalCustomerContext.Provider value={{isVisible, handleVisible, handleCustomer}}>
            {isVisible && <CustomerModal customer={undefined} />}
            {(isVisible && customer) && <CustomerModal customer={customer}/>}
            {children}
        </ModalCustomerContext.Provider>
    )
}
