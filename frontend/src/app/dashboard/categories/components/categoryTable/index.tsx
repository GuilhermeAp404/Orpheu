'use client'
import React, { useContext } from 'react'
import { CategoryContext } from '../../providers/categoryProvider'
import  useCategories  from '@/hooks/useCategories'
//Estilo
import styles from './styles.module.scss'

export default function CategoryTable() {
    const {categories, getCategoryToUpdate} = useContext(CategoryContext)
    const {deleteCategory} = useCategories()

    return (
        <section className={"tableSection"}>
            <header>
                <h2>Categorias disponiveis</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category)=>(
                        <tr key={category.id}>
                            <td>{category.categoryName}</td>
                            <td>
                                <button onClick={()=>getCategoryToUpdate(category.id)} className={styles.tableButton}>Editar</button>
                                <button className={styles.tableButton} onClick={()=>deleteCategory(category.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
