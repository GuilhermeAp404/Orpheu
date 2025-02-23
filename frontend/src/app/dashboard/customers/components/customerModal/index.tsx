import React, { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { X } from 'lucide-react'
import Input from '@/components/input'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ModalCustomerContext } from '@/app/dashboard/providers/modalCustomer'
import Button from '@/components/button'
import useCustomers from '@/hooks/useCustomers'

const schema = z.object({
    name: z.string().min(1, "O nome do cliente não foi preenchido"),
    phone: z.string().min(1, "O telefone do cliente não foi preenchido"),
    address: z.string().min(1, "O endereço do cliente não foi preenchido"),
})

type FormData = z.infer<typeof schema>

interface CustomerModalProps{
    customer?:CustomerProps
}

export default function CustomerModal({customer}:CustomerModalProps) {
    const {createCustomer, updateCustomer} = useCustomers()
    const context = useContext(ModalCustomerContext)
    const {register, setValue, handleSubmit, formState:{errors}}=useForm<FormData>({
            resolver:zodResolver(schema)
    })

    useEffect(()=>{
        if(customer){
            setValue("name", customer.name)
            setValue("phone", customer.phone)
            setValue("address", customer.address)
        }
    }, [customer])

    function update(data:FormData){
        if(customer){
            updateCustomer(data, customer)
        }
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>

                <div className={styles.modalHeader}>
                    <h2>{customer ? 'Atualizar Cliente':'Novo Cliente'}</h2>
                    <X size={34} onClick={context.handleVisible}/>
                </div>

                <form onSubmit={customer? handleSubmit(update) : handleSubmit(createCustomer)}>
                    <Input type={'text'} name={'name'} placeholder='Nome do cliente' register={register} error={errors.name?.message}/>
                    <Input type={'text'} name={'phone'} placeholder='Telefone do cliente' register={register} error={errors.phone?.message}/>
                    <Input type={'text'} name={'address'} placeholder='Endereço do Cliente' register={register} error={errors.address?.message}/>
                    
                    <Button label={customer?'Atualizar':'Criar'} type='submit'/>
                </form>

            </div>
        </div>
    )
}
