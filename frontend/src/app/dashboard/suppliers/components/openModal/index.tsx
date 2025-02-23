'use client'
import { ModalSupplierContext } from '@/app/dashboard/providers/modalSupplier'
import Button from '@/components/button'
import React, { useContext } from 'react'

export default function OpenModal() {
    const {handleVisible} = useContext(ModalSupplierContext)
    return (
        <div>
            <Button label={'+ Adicionar fornecedor'} onClick={handleVisible}/>
        </div>
    )
}
