'use client'
import React, { useContext, useEffect } from 'react'
import { CategoryContext } from '../../../providers/categoryProvider'
//Formulario
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
//Componente
import Button from '@/components/button'
import Input from '@/components/input'
//Api
import api from '@/lib/api'
//Estilo
import styles from './styles.module.scss'
import  useCategories  from '@/hooks/useCategories'

const schema = z.object({
    categoryName: z.string().min(1,"Digite um nome válido para a nova categoria."),
})
type FormData = z.infer<typeof schema>

export default function UpdateCategoryForm() {
    const {updateCategory}=useCategories()
    const {clearCategoryToUpdate, categoryToUpdate} = useContext(CategoryContext)
    const {register, handleSubmit, setValue, formState:{errors}}=useForm<FormData>({
        resolver:zodResolver(schema),
        reValidateMode: "onBlur"
    })

    useEffect(()=>{
        if(categoryToUpdate){
            setValue('categoryName', categoryToUpdate.categoryName)
        }
    }, [categoryToUpdate])

    async function update(data:FormData){
        if(categoryToUpdate){
            await updateCategory(data, categoryToUpdate)
        }
    }
    
    return (
        <>
            <h2>Atualizar categoria</h2>
            <div className={styles.updateDisplay}>
                <span><strong>id: </strong> {categoryToUpdate?.id}</span>
                <span><strong>Categoria: </strong> {categoryToUpdate?.categoryName}</span>
            </div>
            <form onSubmit={handleSubmit(update)}>
                <Input type="text" placeholder='Nome da categoria' name={'categoryName'} register={register} error={errors.categoryName?.message}/>
                <Button label={'Atualizar'} type='submit'/>
                <Button label={'Limpar'} type={"button"} onClick={clearCategoryToUpdate}/>
            </form>
        </>
)
}
