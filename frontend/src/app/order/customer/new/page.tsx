import React from 'react'
import styles from './styles.module.scss'
import OrderCustomerDisplay from '../components/orderCustomerDIsplay'

export default function SupplierNewOrder() {
    return (
        <div className={styles.orderWrapper}>
            <OrderCustomerDisplay/>
        </div>
    )
}
