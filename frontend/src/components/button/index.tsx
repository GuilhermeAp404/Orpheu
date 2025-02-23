import React from 'react'
import styles from './styles.module.scss'

interface ButtonProps{
    type?: "button" | "submit"
    label: string
    onClick?:()=>void
}

export default function Button({type, label, onClick}:ButtonProps) {
    return (
        <button className={styles.button} type={type} onClick={onClick}>
            {label}
        </button>
    )
}