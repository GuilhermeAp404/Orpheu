import React from 'react'
import styles from './styles.module.scss'
import OrderSupplierDisplay from '../components/orderSupplierDIsplay'

export default function SupplierNewOrder() {
    return (
        <div className={styles.orderWrapper}>
            <OrderSupplierDisplay/>
        </div>
    )
}
