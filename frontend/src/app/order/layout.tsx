import React, { ReactNode } from "react"
import styles from './layout.module.scss'
import RouteProtector from "@/components/routeProtector"
import { OrderSupplierProvider } from "./providers/orderSupplierProvider"
import { OrderCustomerProvider } from "./providers/orderCustomerProvider"

export default function OrderLayout({children,}: {children: ReactNode}) {
    return (
        <RouteProtector>
            <OrderSupplierProvider>
                <OrderCustomerProvider>
                    <div className={styles.layout}>
                        {children}
                    </div>
                </OrderCustomerProvider>
            </OrderSupplierProvider>
        </RouteProtector>
    )
}