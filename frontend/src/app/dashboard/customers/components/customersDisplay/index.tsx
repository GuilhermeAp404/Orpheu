'use client'
import React, { ChangeEvent, useContext, useMemo, useState } from 'react'
import styles from './styles.module.scss'
import { MapPin, Pencil, Search, Trash2 } from 'lucide-react'
import { ModalCustomerContext } from '@/app/dashboard/providers/modalCustomer'
import { debounce } from 'lodash'
import useCustomers from '@/hooks/useCustomers'

export default function CustomersDisplay({customers}:{customers:CustomerProps[]}) {
    const {deleteCustomer}= useCustomers()
    const [customersFound, setCustomersFound] = useState(customers)
    const {handleCustomer} = useContext(ModalCustomerContext)

    function findCustomers(name:string){
        const foundCostumers = customers.filter(customer=>customer.name.includes(name))
        setCustomersFound(foundCostumers)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const searchString = e.target.value
        debouncedSearch(searchString)
    }
    
    const debouncedSearch = useMemo(() => 
        debounce((searchString: string) => {
            findCustomers(searchString)
        }, 500),
    [customers])

    return(
        <>
            <div className={styles.search}>
                <Search  size={24} color='#3D3D3D'/>
                <input type="text" placeholder='Digite o nome do cliente...' onChange={(e)=>handleChange(e)}/>
            </div>
            {customersFound.map((customer)=>(
                <div className={styles.customer} key={customer.id}>
                    <div>
                        <h3>{customer.name}</h3>
                        <div className={styles.customerInfo}>
                            <span><strong>Tel: </strong> {customer.phone}</span>
                            <span><MapPin  size={20}/> {customer.address}</span>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button onClick={()=> handleCustomer(customer)}>
                            <Pencil size={34} color='#1E90FF'/>
                        </button>
                        <button onClick={()=> deleteCustomer(customer.id)}>
                            <Trash2 size={34} color='#ff2c2c'/>
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
