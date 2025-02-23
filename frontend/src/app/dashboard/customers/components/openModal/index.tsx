'use client'
import { ModalCustomerContext } from '@/app/dashboard/providers/modalCustomer'
import Button from '@/components/button'
import React, { useContext } from 'react'

export default function OpenModal() {
    const {handleVisible}=useContext(ModalCustomerContext)
    return (
        <div>
            <Button label={"+ Novo Cliente"} type={'button'} onClick={handleVisible}/>
        </div>
    )
}
