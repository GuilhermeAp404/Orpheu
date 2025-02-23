'use client'
import React, { ChangeEvent, useContext, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { MapPin, Pencil, Search, Trash2 } from 'lucide-react'
import { ModalSupplierContext } from '../../../providers/modalSupplier'
import { debounce } from 'lodash'
import useSuppliers from '@/hooks/useSuppliers'

export default function SuppliersDisplay({suppliers}:{suppliers:SupplierProps[]}) {
    const {deleteSupplier} = useSuppliers()
    const [suppliersFound, setSuppliersFound] = useState<SupplierProps[]>(suppliers)
    const {handleSupplier} = useContext(ModalSupplierContext)
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchString = e.target.value
        debouncedSearch(searchString)
    }

    const debouncedSearch = useMemo(() =>
            debounce((searchString: string) => {
                const search = suppliers.filter((s) =>
                    s.name.toLowerCase().includes(searchString.toLowerCase())
                )
                setSuppliersFound(search)
            }, 500),
    [suppliers])


    return (
        <>
            <div className={styles.search}>
                <Search  size={24} color='#3D3D3D'/>
                <input type="text" placeholder='Digite o nome do cliente...' onChange={(e)=>handleChange(e)}/>
            </div>

            {suppliersFound.map((supplier)=>(
                <section className={styles.customer} key={supplier.id}>
                    <div>
                        <h3>{supplier.name}</h3>
                        <div className={styles.customerInfo}>
                            <span><strong>Tel: </strong> {supplier.phone}</span>
                            <span><strong>CNPJ: </strong> {supplier.register}</span>
                            <span><MapPin  size={20}/> {supplier.address}</span>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button onClick={()=> handleSupplier(supplier)}>
                            <Pencil size={34} color='#1E90FF'/>
                        </button>
                        <button onClick={()=> deleteSupplier(supplier.id)}>
                            <Trash2 size={34} color='#ff2c2c'/>
                        </button>
                    </div>
                </section>
            ))}
        </>
    )
}
