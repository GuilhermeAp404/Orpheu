import React from 'react'
import styles from './page.module.scss'
import CustomersDisplay from './components/customersDisplay'
import OpenModal from './components/openModal'
import api from '@/lib/api'
import { getSession } from '@/lib/auth'

async function getCustomers(){
    const session = await getSession()
    let customers:CustomerProps[] = [] 
    if(session){
        try {
            const response = await api.get('/customer', {
                headers:{
                    Authorization:`Bearer ${session.user.token}`
                }
            })

            customers = response.data
        } catch (error) {
            console.log(error)
        }
    }

    return customers
}


export default async function Customers() {
    const customers:CustomerProps[] = await getCustomers()

    return (
            <div className={styles.wrapper}>
                <header className={styles.pageHeader}>
                    <h1>Seus Clientes</h1>
                    <OpenModal />
                </header>
                <CustomersDisplay customers={customers}/>
            </div>
    )
}
