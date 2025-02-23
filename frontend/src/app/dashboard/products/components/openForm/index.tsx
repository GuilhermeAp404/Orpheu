'use client'
import React, { useContext } from 'react'
import Button from '@/components/button'
import { ProductFormContext } from '../../providers/productFormContext'


export default function OpenForm() {
    const {isVisible, handleVisible} = useContext(ProductFormContext)

    return (
        <div>
            <Button label={isVisible?('Fechar'):('Criar produto')} onClick={handleVisible}/>
        </div>
    )
}
