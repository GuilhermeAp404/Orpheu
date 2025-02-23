import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import RouteProtector from '../../components/routeProtector'
import { ModalCustomerProvider } from './providers/modalCustomer'
import { ModalSupplierProvider } from './providers/modalSupplier'
import Header from './components/header'
import Container from '@/components/container'

export default function DashboardLayout({children}:{children:ReactNode}) {
    return (
        <RouteProtector>
            <ModalSupplierProvider>
                <ModalCustomerProvider>
                    <div className={styles.layout}>
                        <Header/>
                        <Container>
                            {children}
                        </Container>
                    </div>
                </ModalCustomerProvider>
            </ModalSupplierProvider>
        </RouteProtector>
    )
}
