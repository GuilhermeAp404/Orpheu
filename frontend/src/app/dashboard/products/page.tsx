import React from 'react'
import styles from './page.module.scss'
import ProductDisplay from './components/productDisplay'
import {ProductsContextProvider} from './providers/productsContext'
import {ProductFormProvider} from './providers/productFormContext'
import OpenForm from './components/openForm'
import FormDisplay from './components/formDisplay'

export default async function Products() {
    return (
        <ProductsContextProvider>
            <ProductFormProvider>
                <div className={styles.wrapper}>
                    <header className={styles.pageHeader}>
                        <h1>Produtos</h1>
                        <OpenForm/>
                    </header>
                    <FormDisplay/>
                    <ProductDisplay />
                </div>
            </ProductFormProvider>
        </ProductsContextProvider>
    )
}
