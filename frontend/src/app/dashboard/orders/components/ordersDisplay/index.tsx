'use client'
import React, { useState } from 'react'
import CustomerOrderTable from '../customerOrderTable'
import SupplierOrderTable from '../supplierOrderTable'
import Tab from '../tab'
import styles from './styles.module.scss'

interface OrderDisplayProps{
    customerOrders:CustomerOrderProps[]
    supplierOrders:SupplierOrderProps[]
}

export default function OrderDisplay({customerOrders, supplierOrders}:OrderDisplayProps) {
    const [selectTab, setSelectTab] = useState<string>('customer')

    function handleTabChange(tab:string){
        setSelectTab(tab)
    }

    return (
        <>
            <div className={styles.tabWrapper}>
                <Tab label={'Clientes'} selected={selectTab==='customer'?true:false} getTab={()=>handleTabChange('customer')} />
                <Tab label={'Forncedores'} selected={selectTab==='supplier'?true:false} getTab={()=>handleTabChange('supplier')} />
            </div>
            <section>
                {selectTab==='customer'?(
                    <CustomerOrderTable orders={customerOrders}/>
                ):(
                    <SupplierOrderTable orders={supplierOrders}/>
                )}
            </section>
        </>
    )
}
