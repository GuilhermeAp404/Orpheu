'use client'
import React from 'react'
import styles from './styles.module.scss'

interface TabProps{
    label:string
    selected:boolean,
    getTab:()=>void
}

export default function Tab({label, selected, getTab}:TabProps) {
    return (
        <button type='button' className={`${styles.tab} ${selected && styles.inTab}`} onClick={getTab}>
            {label}
        </button>
    )
}
