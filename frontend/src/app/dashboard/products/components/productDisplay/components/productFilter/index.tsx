'use client'
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Button from '@/components/button'
import api from '@/lib/api'
import { ProductsContext } from '@/app/dashboard/products/providers/productsContext'
import { ProductFormContext } from '@/app/dashboard/products/providers/productFormContext'

export default function ProductFilter() {
    const {categories} = useContext(ProductFormContext)
    const {filterOnChange, clearFilter, doAFilter} = useContext(ProductsContext)

    function clear(){
        let select = document.getElementById("filterInput") as HTMLSelectElement
        select.value = ""
        
        let input = document.getElementById("filterSelect") as HTMLInputElement
        input.value = ""

        clearFilter()
    }

    return (
        <div className={styles.filter}>
            <input id="filterInput" type="text" name='productName' placeholder='Nome do Produto' onChange={filterOnChange}/>
            <select id="filterSelect" name="category" defaultValue="" onChange={filterOnChange}>
                <option value="">Sem categoria</option>
                {categories?.map((c)=>(
                    <option value={c.categoryName} key={c.id}>{c.categoryName}</option>
                ))}
            </select>
            <div className={styles.filterActions}>
                <Button label='Buscar' onClick={doAFilter}/>
                <Button label='Limpar' onClick={clear}/>
            </div>
        </div>
    )
}


