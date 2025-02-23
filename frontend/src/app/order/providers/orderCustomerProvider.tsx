'use client'
import useCustomerOders from '@/hooks/useCustomerOrders'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export interface OrderCustomerContextProps{
    cart:OrderProductProps[]
    sendToCart:(orderProduct:OrderProductProps)=>void
    customer:CustomerProps|undefined
    handleCustomer:(customer:CustomerProps)=>void
    removeItem:(id:number)=>void
    createOrder:()=>void
    updateOrder:()=>void
    total:number,
    getOrderId:(id:string)=>void
}

export const OrderCustomerContext = createContext({} as OrderCustomerContextProps)

export function OrderCustomerProvider({children}:{children:ReactNode}) {
    const {status}=useSession()
    const {createCustomerOrder, getCustomerOrder, updateCustomerOrder} = useCustomerOders()

    const [orderId, setOrderId] = useState<string|undefined>()
    const [cart, setCart] = useState<OrderProductProps[]>([])
    const [customer, setCustomer]= useState<CustomerProps|undefined>()

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

    function handleCustomer(customer:CustomerProps){
        setCustomer(customer)
    }

    const total = useMemo(() => {
        return cart.reduce((acumulador, op) => {
            if(op.totalCost){
                return acumulador + op.totalCost
            }

            return acumulador + (op.quantity * op.product.sellingPrice);
        }, 0);
    }, [cart])

    async function createOrder(){
        if(cart.length===0){
            toast.warning('Não é possivel atualizar um pedido com o carrinho vazio.')
            return
        }
        
        if(customer===undefined){
            toast.warning('Selecione um cliente, para poder criar um pedido.')
            return
        }  

        const newOrder={
            customer: customer,
            customerOrderProducts:cart,
            total
        } as CustomerOrderProps
        
        await createCustomerOrder(newOrder)
    }

    async function updateOrder(){
        if(cart.length===0){
            toast.warning('Não é possivel atualizar um pedido com o carrinho vazio.')
            return
        }
        
        if(customer===undefined){
            toast.warning('Selecione um cliente, para poder criar um pedido.')
            return
        }

        const updatedOrder={
            customer: customer,
            customerOrderProducts:cart,
            total
        } as CustomerOrderProps

        if(orderId){
            const id = Number(orderId)
            await updateCustomerOrder(updatedOrder, id)
        }
    }

    function getOrderId(id:string){
        setOrderId(id)
    }

    useEffect(()=>{
        async function fillOrder(){
            if(orderId){
                const id = Number(orderId)
                const order = await getCustomerOrder(id)

                if(!order){
                    redirect("/dashboard")
                }
                
                setCustomer(order.customer)
                setCart(order.customerOrderProducts)
            }
        }   

        if(status==='authenticated') fillOrder()
    }, [status, orderId])

    return (
        <OrderCustomerContext.Provider value={{cart, sendToCart, customer, handleCustomer, removeItem, total, createOrder, updateOrder, getOrderId}}>
            {children}
        </OrderCustomerContext.Provider>
    )
}
