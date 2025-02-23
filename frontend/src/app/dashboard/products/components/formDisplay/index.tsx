'use client'
import React, { useContext } from 'react'
import { ProductFormContext } from '../../providers/productFormContext'
import ProductUpdateForm from '../forms/productUpdateForm'
import ProductForm from '../forms/productForm'

export default function FormDisplay() {
    const {isVisible, product} = useContext(ProductFormContext)
    
    return (
        <>
            {isVisible && (
                <>
                    {product?(
                        <ProductUpdateForm product={product} />
                    ):(
                        <ProductForm />
                    )}
                </>
            )}
        </>
    )
}
