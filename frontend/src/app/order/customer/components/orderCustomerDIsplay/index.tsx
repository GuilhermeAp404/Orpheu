'use client'
import React, { useContext, useEffect } from 'react'
import ProductInformation from '@/app/order/components/productInformation'
import { OrderCustomerContext } from '@/app/order/providers/orderCustomerProvider'
import styles from './styles.module.scss'
import CustomerInfo from '../customerInfo'
import OrderTable from '@/app/order/components/cartTable'
import Button from '@/components/button'
import { redirect } from 'next/navigation'

export default function OrderCustomerDisplay({id}:{id?:string}) {
    const{sendToCart, total, createOrder, updateOrder, getOrderId} = useContext(OrderCustomerContext)

    useEffect(()=>{
        if(id){
            getOrderId(id)
        }
    }, [id])
    
    return (
        <div className={styles.div}>
            <div>
                <ProductInformation sendToCart={sendToCart} />

                <div className={`tableSection ${styles.tableDiv}`}>
                    <OrderTable mode={'customer'}/>
                </div>

                <div className={styles.total}>
                    <span>
                        <strong>Total: </strong>R${total.toFixed(2)}
                    </span>
                </div>

                <div className={styles.orderActions}>
                    <Button label={!id ? "Finalizar Pedido" : "Atualizar Pedido"} onClick={!id ? createOrder : updateOrder}/>
                    <Button label={'Cancelar Pedido'} onClick={()=>redirect('/dashboard')}/>
                </div>

            </div>
            <div>
                <CustomerInfo/>

                <div className={styles.orderActions}>
                    <Button label={!id ? "Finalizar Pedido" : "Atualizar Pedido"} onClick={!id ? createOrder : updateOrder}/>
                    <Button label={!id ? "Cancelar Pedido" :"Voltar para dashboard"} onClick={()=>redirect('/dashboard')}/>
                </div>
                
            </div>
        </div>
    )
}
