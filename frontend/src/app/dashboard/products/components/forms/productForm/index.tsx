'use client'
import React, { useContext } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/input'
import api from '@/lib/api'
import styles from './styles.module.scss'
import Button from '@/components/button'
import { ProductFormContext } from '../../../providers/productFormContext'
import useProducts from '@/hooks/useProducts'

const schema = z.object({
    productName: z.string().min(1, 'preencha o nome do produto').max(100, 'Numero de caracteres excedido.'),
    category: z.string().min(1, 'A categoria precisa ser preenchida'),
    costPrice: z.string().regex(/^\d+(\.\d{2})?$/, "O preço deve estar no formato 0.00").transform((value) => parseFloat(value)),
    sellingPrice: z.string().regex(/^\d+(\.\d{2})?$/, "O preço deve estar no formato 0.00").transform((value) => parseFloat(value)),
})

type FormData = z.infer<typeof schema>

export default function ProductForm() {
    const {createProduct} = useProducts()
    const {categories} = useContext(ProductFormContext)
    const {register, handleSubmit, formState:{errors}}=useForm<FormData>({
                resolver:zodResolver(schema)
    })

    async function create(data:FormData){
        let createData = {
            productName:data.productName,
            category:categories?.filter(c=>c.categoryName === data.category)[0],
            costPrice:data.costPrice,
            sellingPrice:data.sellingPrice,
            amount:0
        } as ProductProps

        await createProduct(createData)
    }

    return (
        <div className={styles.formWrapper}>
            <h2>Cadastrar produto</h2>

            <form className={styles.form} onSubmit={handleSubmit(create)}>

                <div className={styles.firstRow}>
                    <Input type={'text'} name={'productName'} register={register} placeholder={"Nome do produto"} error={errors.productName?.message}/>
                    <div className={styles.selectDiv}>
                        <select id="category" {...register("category")} defaultValue="" className={styles.select}>
                            <option value="" hidden>
                                Selecione uma categoria
                            </option>
                            {categories?.map((c)=>(
                                <option value={c.categoryName} key={c.id}>{c.categoryName}</option>
                            ))}
                        </select>
                        {errors.category?.message &&(<p>{errors.category.message}</p>)}
                    </div>
                </div>

                <div className={styles.secondRow}>
                    <Input type={'text'} name={'costPrice'} placeholder={"P. de custo (ex: 120.00)"} register={register} error={errors.costPrice?.message}/>
                    <Input type={'text'} name={'sellingPrice'} placeholder={"P. de venda (ex: 240.00)"} register={register} error={errors.sellingPrice?.message}/>
                    <Button label={'Criar produto'} type='submit'/>
                </div>

            </form>

        </div>
    )
}
