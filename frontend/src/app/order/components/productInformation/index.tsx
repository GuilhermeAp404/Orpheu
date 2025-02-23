'use client'
import React, { useEffect, useState, ChangeEvent } from 'react'
import styles from './styles.module.scss'
import Button from '@/components/button'
import { useSession } from 'next-auth/react'
import api from '@/lib/api'

interface ProductInformationProps{
    sendToCart:(orderProduct:OrderProductProps)=>void
}

export default function ProductInformation({sendToCart}:ProductInformationProps) {
    const {data: session, status}=useSession()
    const [products, setProducts] = useState<ProductProps[]>([])
    const [orderProduct, setOrderProduct] = useState<OrderProductProps>({} as OrderProductProps)
    
    useEffect(()=>{
        async function getProducts() {
            if(session){
                const response = await api.get('/product', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200) setProducts(response.data)
            }
        }

        if(status==='authenticated') getProducts()
    }, [session, status])
    
    function handleChange(e: ChangeEvent<HTMLInputElement|HTMLSelectElement>): void {
        const {name, value} = e.target
        let product:ProductProps[]

        if (!value) {
            setOrderProduct({} as OrderProductProps);
            return;
        }

        if(name === "productId"){
            product = products.filter((p)=>p.id===Number(value))
            if(product.length!==0) setOrderProduct(prev=>({...prev, product: product[0]}))
            return
        }
        
        product = products.filter((p)=>p.productName===value)
        if(product.length!==0) setOrderProduct(prev=>({...prev, product: product[0]}))
    }

    return (
        <>
            <h3 className={styles.title}>Produtos</h3>
            
            <div className={styles.productInfoWrapper}>
                <div className={styles.productId}>
                    <label htmlFor="productId">Id</label>
                    <input 
                        name={"productId"} 
                        type={"text"} 
                        value={orderProduct?.product?.id ||""} 
                        placeholder={"Id"} 
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                    
                <div className={styles.productName}>
                    <label htmlFor="productName">Nome do Produto</label>
                    <select 
                        name={"productName"} 
                        value={orderProduct?.product?.productName ||""} 
                        onChange={(e)=>handleChange(e)}
                    >
                        <option value="">Selecionar Produto</option>

                        {products.map(product=>(
                            <option value={product.productName} key={product.id}>
                                {product.productName}
                            </option>
                        ))}

                    </select>
                </div>

                <div className={styles.productCategory} >
                    <label htmlFor="productCategory">Categoria</label>
                    <input 
                        name={"productCategory"} 
                        type={"text"} 
                        value={orderProduct?.product?.category.categoryName ||""} 
                        readOnly
                    />
                </div>

                <div className={styles.costPrice}>
                    <label htmlFor="costPrice">Preço de custo</label>
                    <input 
                        name={"costPrice"} type={"text"} 
                        value={orderProduct?.product?.costPrice?.toFixed(2)||""} 
                        placeholder={"0.00"} 
                        readOnly
                    />
                </div>

                <div className={styles.sellingPrice}>
                    <label htmlFor="sellingPrice">Preço de venda</label>
                    <input 
                        name={"sellingPrice"} 
                        type={"text"} 
                        placeholder={"0.00"} 
                        value={orderProduct?.product?.sellingPrice?.toFixed(2)||""} 
                        readOnly
                    />
                </div>

                <div className={styles.quantity} >
                    <label htmlFor="productName">Quantidade</label>
                    <input 
                        name={"quantity"} 
                        type={"number"} 
                        placeholder={"0"}
                        value={orderProduct?.quantity||""}
                        onChange={(e)=>setOrderProduct(prev=>({...prev, quantity:Number(e.target.value)}))}
                    />
                </div>

                <div className={styles.actions}>
                    <label htmlFor="">Ações</label>

                    <div>
                        <Button 
                            label={'Adicionar'} 
                            onClick={()=>{
                                sendToCart(orderProduct)
                                setOrderProduct({} as OrderProductProps)
                            }}
                        />

                        <Button 
                            label={'Limpar'} 
                            onClick={()=>{
                                setOrderProduct({} as OrderProductProps)
                            }}
                        />
                    </div>

                </div>

            </div>
        </>
    )
}
