import { Metadata } from 'next';
import React from 'react'
import styles from './page.module.scss'
import QuickMenu from './components/quickMenu';
import Profit from './components/profit';
import CreateOrderMenu from './components/createOrderMenu';

export const metadata: Metadata = {
    title: "Orpheu - Dashboard",
};

export default async function Dashboard() {
    return (
        <section className={styles.pageWrapper}>
            <header>
                <h1>Dashboard</h1>
            </header>
            <Profit/>
            
            <div>
                <h2>Menu Rápido</h2>
                <QuickMenu/>
            </div>
            
            <div>
                <h2>Criar Pedidos</h2>
                <CreateOrderMenu/>
            </div>
        </section>
    )
}
