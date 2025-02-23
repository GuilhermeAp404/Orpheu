'use client'
import React, { useContext, useEffect } from 'react'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/input'
import styles from './styles.module.scss'
import Button from '@/components/button'
import { ProductFormContext } from '../../../providers/productFormContext'
import useProducts from '@/hooks/useProducts'

const schema = z.object({
    productName: z.string().min(1, 'preencha o nome do produto').max(100, 'Numero de caracteres excedido.'),
    category: z.string().min(1, 'A categoria precisa ser preenchida'),
    costPrice: z.string().regex(/^\d+(\.\d{2})?$/, "O preço deve estar no formato 0.00"),
    sellingPrice: z.string().regex(/^\d+(\.\d{2})?$/, "O preço deve estar no formato 0.00"),
})

type FormData = z.infer<typeof schema>

export default function ProductUpdateForm({product}:{product:ProductProps}) {
    const {updateProduct} = useProducts()
    const {categories} = useContext(ProductFormContext)
    const {register, handleSubmit, setValue, formState:{errors}}=useForm<FormData>({
        resolver:zodResolver(schema)
    })

    useEffect(()=>{
        if(product){
            setValue("productName", product.productName)
            setValue("category", product.category.categoryName)
            setValue("costPrice", product.costPrice.toFixed(2))
            setValue("sellingPrice", product.sellingPrice.toFixed(2))
        }
    }, [product])

    async function update(data:FormData){
        if(product){
            let updateData = {
                productName: data.productName,
                category: categories?.filter(c => c.categoryName === data.category)[0],
                costPrice: Number(data.costPrice),
                sellingPrice: Number(data.sellingPrice),
                amount: product.amount
            } as ProductProps
    
            await updateProduct(updateData, product)
        }
    }

    return (
        <div className={styles.formWrapper}>
            <h2>Alterar produto</h2>

            <form className={styles.form} onSubmit={handleSubmit(update)}>

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
                    <Input type={'text'} name={'costPrice'} placeholder={"P. de custo (ex: 120,00)"} register={register} error={errors.costPrice?.message}/>
                    <Input type={'text'} name={'sellingPrice'} placeholder={"P. de venda (ex: 240,00)"} register={register} error={errors.sellingPrice?.message}/>
                    <div className={styles.functions}>
                        <Button label={'Atualizar'} type='submit'/>
                    </div>
                </div>

            </form>

        </div>
    )
}
