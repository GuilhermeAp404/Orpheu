'use client'
import React, { useContext } from 'react'
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

export default function CreateCategoryForm() {
    const {createCategory} = useCategories()
    const {register, handleSubmit, setValue, formState:{errors}}=useForm<FormData>({
        resolver:zodResolver(schema),
        reValidateMode: "onBlur"
    })

    return (
        <>
            <h2>Cadastrar nova categoria</h2>
            <form onSubmit={handleSubmit(createCategory)}>
                <Input type={"text"} placeholder={"Nome da categoria"} name={"categoryName"} register={register} error={errors.categoryName?.message}/>
                <Button label={'+Adicionar categoria'} type='submit'/>
            </form>
        </>
    )
}
