import React from 'react'
import styles from './styles.module.scss'
import OrderCustomerDisplay from '../components/orderCustomerDIsplay'
import { redirect } from 'next/navigation';

export default async function SupplierOrder({params}:{params:{id:string}}) {
    const {id} = await params

    if (!id || isNaN(Number(id))) {
        redirect("/dashboard")
    }
    
    return (
        <div className={styles.orderWrapper}>
            <OrderCustomerDisplay id={id} />
        </div>
    )
}
