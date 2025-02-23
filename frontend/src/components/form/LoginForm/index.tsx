'use client'
import React from 'react'
import Input from '@/components/input'
import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import Button from '@/components/button'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const schema = z.object({
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(1, "Preencha o campo de senha")
})

type FormData = z.infer<typeof schema>

export default function LoginForm() {
    const router = useRouter()
    const {register, handleSubmit, formState:{errors}}=useForm<FormData>({
        resolver:zodResolver(schema)
    })

    async function submitForm(data:FormData){
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect:false
        })
        
        if(result?.error){
            toast.error(result.error)
            return
        }
        
        router.push('/dashboard')
        toast.success('Login efetuado com sucesso')
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
            <Input 
                type={'text'}
                name={'email'}
                placeholder={'E-mail'}
                register={register}
                error={errors.email?.message}
            />
            <Input 
                type={'password'}
                name={'password'}
                placeholder={'Senha'}
                register={register}    
                error={errors.password?.message}           
            />
            <div className={styles.buttonDiv}>

            </div>
            <Button label='Entrar'/>
        </form>
    )
}
