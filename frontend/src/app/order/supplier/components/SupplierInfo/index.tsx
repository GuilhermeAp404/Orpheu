'use client'
import React, { useEffect, useState, ChangeEvent, useContext } from 'react'
import styles from './styles.module.scss'
import { useSession } from 'next-auth/react'
import api from '@/lib/api'
import { OrderSupplierContext } from '@/app/order/providers/orderSupplierProvider'

export default function SupplierInfo() {
    const {data: session, status}=useSession()
    const [suppliers, setProducts] = useState<SupplierProps[]>([])
    const {supplier, handleSupplier} = useContext(OrderSupplierContext)
    
    useEffect(()=>{
        async function getSuppliers() {
            if(session){
                const response = await api.get('/supplier', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200) setProducts(response.data)
            }
        }

        if(status==='authenticated') getSuppliers()
    }, [session, status])

    
    
    function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
        let{value}=e.target
        let supplier = suppliers.filter(s=>s.name === value)

        if(supplier.length>0){
            handleSupplier(supplier[0])
        }
    }

    return (
        <div>
            <h3 className={styles.title}>Fornecedor</h3>
            
            <select 
                name={"productName"} 
                value={supplier?.name || ""} 
                onChange={(e)=>handleChange(e)}
            >
                <option value="">Selecionar Fornecedor</option>

                {suppliers.map(supplier=>(
                    <option value={supplier.name} key={supplier.id}>
                        {supplier.name}
                    </option>
                ))}
            </select>
            {supplier && (
                <div className={styles.supplierInfo}>
                    <span><strong>Nome: </strong>{supplier?.name}</span>
                    <span><strong>Endereço: </strong>{supplier?.address}</span>
                    <span><strong>Telefone: </strong>{supplier?.phone}</span>
                    <span><strong>CNPJ: </strong>{supplier?.register}</span>
                </div>
            )}
        </div>
    )
}
