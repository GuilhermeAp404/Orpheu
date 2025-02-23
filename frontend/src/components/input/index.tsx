import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import styles from './styles.module.scss'

interface InputProps{
    type:string
    placeholder?:string
    name:string
    register:UseFormRegister<any>
    error?:string
    rules?:RegisterOptions
}

export default function Input({type, placeholder, name, register, error, rules}:InputProps) {
    return (
        <div className={styles.inputWrapper}>
            <input 
                className={styles.input}
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
            />
            {error && (<p className={styles.error}>{error}</p>)}
        </div>
    )
}