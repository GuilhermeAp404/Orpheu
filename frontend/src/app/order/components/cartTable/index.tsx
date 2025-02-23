'use client'
import React, { Context, useContext } from 'react'
import { OrderSupplierContexProps, OrderSupplierContext } from '../../providers/orderSupplierProvider'
import { Trash2 } from 'lucide-react'
import { OrderCustomerContext, OrderCustomerContextProps } from '../../providers/orderCustomerProvider'

export default function CartTable({mode}:{mode:string}) {
    const context = mode === 'customer' ? useContext<OrderCustomerContextProps>(OrderCustomerContext) : useContext<OrderSupplierContexProps>(OrderSupplierContext);
    const {cart, removeItem} = context

    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>{mode==="customer"? "P. de venda" : "P. de custo"}</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart.map((op)=>(
                    <tr key={op.product.id}>
                        <td>{op.product.id}</td>
                        <td>{op.product.productName}</td>
                        <td>{op.quantity}</td>
                        {op.totalCost?(
                            <>
                                <td>
                                    {`R$ ${(op.totalCost/op.quantity).toFixed(2)}`}
                                </td>
                                <td>
                                    {`R$ ${op.totalCost.toFixed(2)}`}
                                </td>
                            </>
                        ):(
                            <>
                                <td>
                                    {mode==="customer"?
                                        (`R$ ${op.product.sellingPrice.toFixed(2)}`):
                                        (`R$ ${op.product.costPrice.toFixed(2)}`)
                                    }
                                </td>
                                <td>
                                    {mode==="customer"?
                                        (`R$ ${(op.quantity*op.product.sellingPrice).toFixed(2)}`):
                                        (`R$ ${(op.quantity*op.product.costPrice).toFixed(2)}`)
                                    }
                                </td>
                            </>
                        )}
                        
                        <td className={"actions"}>
                            <button onClick={()=>removeItem(op.product.id)}>
                                <Trash2 color='#ff2c2c'/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
