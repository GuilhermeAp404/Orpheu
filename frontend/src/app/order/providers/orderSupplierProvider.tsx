'use client'
import useSupplierOders from '@/hooks/useSupplierOrders'
import api from '@/lib/api'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export interface OrderSupplierContexProps{
    cart:OrderProductProps[]
    sendToCart:(orderProduct:OrderProductProps)=>void
    supplier:SupplierProps|undefined
    handleSupplier:(supplier:SupplierProps)=>void
    removeItem:(id:number)=>void
    createOrder:()=>void
    updateOrder:()=>void
    total:number,
    getOrderId:(id:string)=>void
}

export const OrderSupplierContext = createContext({} as OrderSupplierContexProps)

export function OrderSupplierProvider({children}:{children:ReactNode}) {
    const {status} = useSession()
    const {createSupplierOrder, updateSupplierOrder, getSupplierOrder} = useSupplierOders()

    const [orderId, setOrderId] = useState<string|undefined>()
    const [cart, setCart] = useState<OrderProductProps[]>([])
    const [supplier, setSupplier]= useState<SupplierProps|undefined>()

    function sendToCart(orderProduct:OrderProductProps){
        if(Object.keys(orderProduct).length === 0){
            toast.warning('Selecione um produto e tente novamente')
            return
        }
        
        if(!orderProduct.quantity){
            toast.warning('Insira a quantidade do produto')
            return
        }

        let newCart = cart.filter(op=> op.product.id !== orderProduct.product.id)
        newCart.push(orderProduct)
        setCart(newCart)
    }

    function removeItem(id:number){
        let newCart = cart.filter(op=> op.product.id !== id)
        setCart(newCart)
    }

    function handleSupplier(supplier:SupplierProps){
        setSupplier(supplier)
    }

    const total = useMemo(() => {
        return cart.reduce((acumulador, op) => {
            if(op.totalCost){
                return acumulador + op.totalCost
            }

          return acumulador + (op.quantity * op.product.costPrice);
        }, 0);
    }, [cart])

    async function createOrder(){
        if(cart.length===0){
            toast.warning('Não é possivel atualizar um pedido com o carrinho vazio.')
            return
        }
        
        if(supplier===undefined){
            toast.warning('Selecione um forncedor, para poder criar um pedido.')
            return
        }

        const newOrder = {
            supplier,
            supplierOrderProducts:cart,
            total
        } as SupplierOrderProps

        await createSupplierOrder(newOrder)
    }

    async function updateOrder(){
        if(cart.length===0){
            toast.warning('Não é possivel atualizar um pedido com o carrinho vazio.')
            return
        }
        
        if(supplier===undefined){
            toast.warning('Selecione um forncedor, para poder criar um pedido.')
            return
        }

        const updatedOrder = {
            supplier,
            supplierOrderProducts:cart,
            total
        } as SupplierOrderProps

        if(orderId){
            const id = Number(orderId)
            await updateSupplierOrder(updatedOrder, Number(orderId))
        }
    }

    function getOrderId(id:string){
        setOrderId(id)
    }

    useEffect(()=>{
        async function fillOrder(){
            if(orderId){
                const id = Number(orderId)
                const order = await getSupplierOrder(id)

                if(!order){
                    redirect("/dashboard")
                }
    
                setSupplier(order.supplier)
                setCart(order.supplierOrderProducts)
            }
        }   

        if(status==='authenticated') fillOrder()
    }, [status, orderId])

    return (
        <OrderSupplierContext.Provider value={{cart, sendToCart, supplier, handleSupplier, removeItem, total, createOrder, updateOrder, getOrderId}}>
            {children}
        </OrderSupplierContext.Provider>
    )
}
