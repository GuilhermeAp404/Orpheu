'use client'
import React, { useEffect, useState, ChangeEvent, useContext } from 'react'
import styles from './styles.module.scss'
import { useSession } from 'next-auth/react'
import api from '@/lib/api'
import { OrderCustomerContext } from '@/app/order/providers/orderCustomerProvider'
import useCustomers from '@/hooks/useCustomers'

export default function CustomerInfo() {
    const {status}=useSession()
    const {getCustomers} = useCustomers()
    const [customers, setCustomers] = useState<CustomerProps[]>([])
    const {customer, handleCustomer} = useContext(OrderCustomerContext)
    
    useEffect(()=>{
        async function fillCustomers() {
            const customersList = await getCustomers()
            setCustomers(customersList)
        }

        if(status==='authenticated') fillCustomers()
    }, [status])

    
    
    function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
        let{value}=e.target
        let customer = customers.filter(s=>s.name === value)

        if(customer.length>0){
            handleCustomer(customer[0])
        }
    }

    return (
        <div>
            <h3 className={styles.title}>Cliente</h3>
            
            <select 
                name={"productName"} 
                value={customer?.name || ""} 
                onChange={(e)=>handleChange(e)}
            >
                <option value="">Selecionar Cliente</option>

                {customers.map(customer=>(
                    <option value={customer.name} key={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>
            {customer && (
                <div className={styles.customerInfo}>
                    <span><strong>Nome: </strong>{customer?.name}</span>
                    <span><strong>Endereço: </strong>{customer?.address}</span>
                    <span><strong>Telefone: </strong>{customer?.phone}</span>
                </div>
            )}
        </div>
    )
}
