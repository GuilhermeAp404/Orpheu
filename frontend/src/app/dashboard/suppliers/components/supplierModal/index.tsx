import React, { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { ModalSupplierContext } from '../../../providers/modalSupplier'
import Input from '@/components/input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Button from '@/components/button'
import { useSession } from 'next-auth/react'
import api from '@/lib/api'
import useSuppliers from '@/hooks/useSuppliers'

const schema = z.object({
    name: z.string().min(1, "O nome do fornecedor não foi preenchido"),
    phone: z.string().min(1, "O telefone do fornecedor não foi preenchido"),
    address: z.string().min(1, "O endereço do fornecedor não foi preenchido"),
    register: z.string().min(1, "O CNPJ do fornecedor não foi preenchido"),
})

type FormData = z.infer<typeof schema>

interface SupplierModalProps{
    supplier?:SupplierProps
}

export default function SupplierModal({supplier}:SupplierModalProps) {
    const {createSupplier, updateSupplier} = useSuppliers()
    const context = useContext(ModalSupplierContext)
    const {register, setValue, handleSubmit, formState:{errors}}=useForm<FormData>({
            resolver:zodResolver(schema)
    })
    
    useEffect(()=>{
        if(supplier){
            setValue("name", supplier.name)
            setValue("phone", supplier.phone)
            setValue("address", supplier.address)
            setValue("register", supplier.register)
        }
    }, [supplier])

    function update(data:FormData){
        if(supplier){
            updateSupplier(data, supplier)
        }
    }

    return (
        <div className={styles.modalWrapper}>

            <div className={styles.modal}>

                <div className={styles.modalHeader}>
                    <h2>{supplier?"Atualizar Fornecedor":'Novo Fornecedor'}</h2>
                    <X size={34} onClick={context.handleVisible}/>
                </div>
                <form onSubmit={supplier? handleSubmit(update) : handleSubmit(createSupplier)}>
                    <Input type={'text'} name={'name'} placeholder='Nome do fornecedor' register={register} error={errors.name?.message}/>
                    <Input type={'text'} name={'phone'} placeholder='Telefone do fornecedor' register={register} error={errors.phone?.message}/>
                    <Input type={'text'} name={'address'} placeholder='Endereço do fornecedor' register={register} error={errors.address?.message}/>
                    <Input type={'text'} name={'register'} placeholder='CNPJ do fornecedor' register={register} error={errors.register?.message}/>
                    
                    <Button label={supplier?'Atualizar':'Criar'} type='submit'/>
                </form>
            </div>
        </div>
    )
}
