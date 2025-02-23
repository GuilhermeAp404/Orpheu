import React from 'react'
import styles from './page.module.scss'
import Supplier from './components/suppliersDisplay'
import OpenModal from './components/openModal'
import { getSession } from '@/lib/auth'
import api from '@/lib/api'

async function getSuppliers(){
    const session = await getSession()
    let suppliers:SupplierProps[] = []
    if(session){
        try {
            const response = await api.get('/supplier', {
                headers:{
                    Authorization:`Bearer ${session.user.token}`
                }
            })

            suppliers = response.data
        } catch (error) {
            console.log(error)
        }
    }
    return suppliers
}

export default async function Suppliers() {
    const suppliers:SupplierProps[] = await getSuppliers()
    
    return (
        <div className={styles.wrapper}>
            <header className={styles.pageHeader}>
                <h1>Fornecedores cadastrados</h1>
                <OpenModal />
            </header>

            <Supplier suppliers={suppliers}/>

        </div>
    )
}
