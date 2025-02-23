'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '../../providers/categoryProvider'
import CreateCategoryForm from '../forms/createCategoryForm'
import UpdateCategoryForm from '../forms/updateCategoryForm'
import styles from './styles.module.scss'

export default function FormSection() {
    const {categoryToUpdate} = useContext(CategoryContext)

    return (
        <section className={styles.createSection}>
            {categoryToUpdate===null ? (
                <CreateCategoryForm />
            ):(
                <UpdateCategoryForm />
            )}
        </section>
    )
}
