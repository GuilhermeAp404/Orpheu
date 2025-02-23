import React from 'react'
import ProductFilter from './components/productFilter'
import ProductTabel from './components/productTable'


export default function ProductDisplay() {
    return (
        <>
            <ProductFilter />
            <section className={"tableSection"}>
                <ProductTabel />
            </section>
        </>
    )
}
