'use client'
import React, { useContext } from 'react'
import { ProductsContext } from '@/app/dashboard/products/providers/productsContext'
import { Pencil, Trash2 } from 'lucide-react'
import { ProductFormContext } from '@/app/dashboard/products/providers/productFormContext'
import useProducts from '@/hooks/useProducts'

export default function ProductTabel() {
    const {deleteProduct}=useProducts()
    const {foundProducts} = useContext(ProductsContext)
    const {getProduct} = useContext(ProductFormContext)
    
    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>P. de custo</th>
                    <th>P. de venda</th>
                    <th>Qtd</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {foundProducts.map((product)=>(
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.productName}</td>
                        <td>{product.category.categoryName}</td>
                        <td>{`R$ ${product.costPrice.toFixed(2)}`}</td>
                        <td>{`R$ ${product.sellingPrice.toFixed(2)}`}</td>
                        <td>{product.amount}</td>
                        <td className={"actions"}>
                            <button onClick={()=>getProduct(product)}>
                                <Pencil color='#1E90FF'/>
                            </button>
                            <button onClick={()=>deleteProduct(product.id)}>
                                <Trash2 color='#ff2c2c'/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
