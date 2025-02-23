import React from 'react'
import styles from './page.module.scss'
import { getSession } from '@/lib/auth'
import api from '@/lib/api'
import OrderDisplay from './components/ordersDisplay'

async function getCustomersOrders() {
    const session = await getSession()
    if(session){
        try {
                const response = await api.get('/customer/order', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

            if(response.status===200) return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

async function getSuppliersOrders() {
    const session = await getSession()
    if(session){
        try {
                const response = await api.get('/supplier/order', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

            if(response.status===200) return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

export default async function Orders() {
    const customerOrders:CustomerOrderProps[] = await getCustomersOrders()
    const supplierOrders:SupplierOrderProps[] = await getSuppliersOrders()

    return (
        <div className={styles.wrapper}>
            <header className={styles.pageHeader}>
                <h1>Seus Pedidos</h1>
            </header>
            <OrderDisplay customerOrders={customerOrders} supplierOrders={supplierOrders} />
        </div>
    )
}
