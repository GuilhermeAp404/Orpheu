import React from 'react'
import styles from './page.module.scss'
import {CategoryProvider} from './providers/categoryProvider'
import CategoryTable from './components/categoryTable'
import FormSection from './components/formsSection'

export default function Categories() {

    return (
        <CategoryProvider>
            <div className={styles.wrapper}>
                <header className={styles.pageHeader}>
                    <h1>Categorias</h1>
                </header>
                <div className={styles.content}>
                    <FormSection/>
                    <CategoryTable/>
                </div>
            </div>
        </CategoryProvider>
    )
}
