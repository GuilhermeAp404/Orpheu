'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { CalendarArrowDown, CalendarArrowUp, Eye, Trash2 } from 'lucide-react'
import api from '@/lib/api'
import { useSession } from 'next-auth/react'
import Button from '@/components/button'
import { redirect } from 'next/navigation'
import useCustomers from '@/hooks/useCustomers'
import useCustomerOders from '@/hooks/useCustomerOrders'

interface Filter{
    id:string
    customer: string
    start:Date
    end:Date
}

export default function CustomerOrderTable({orders}:{orders:CustomerOrderProps[]}) {
    const{status}=useSession()
    const {getCustomers} = useCustomers()
    const {deleteCustomerOrder} = useCustomerOders()

    const[customers, setCustomers] = useState<CustomerProps[]>([])
    const[searchOrders, setSearchOrders] = useState<CustomerOrderProps[]>(orders)
    
    const[filtro, setFiltro] = useState<Filter>({} as Filter)

    useEffect(()=>{
        async function fillCustomers(){
            const customersList = await getCustomers()
            setCustomers(customersList)
        }

        if(status==='authenticated') fillCustomers()
    }, [status])

    function handleChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>){
        const {name, value} = event.target

        setFiltro((prev)=>({...prev, [name]:value}))
    }

    function filtrar(){
        const ativos = Object.keys(filtro).filter((key) => filtro[key as keyof Filter])
        let phase1 = orders

        if (ativos.includes("start") && ativos.includes("end")) {
            const startDate = new Date(filtro.start)
            const endDate = new Date(filtro.end)

            phase1 = orders.filter(order => {
                const orderDate = new Date(order.orderDate);
                return orderDate >= startDate && orderDate <= endDate
            });
        }

        else if (ativos.includes("start")) {
            const startDate = new Date(filtro.start)
            
            phase1 = orders.filter(order => new Date(order.orderDate) <= startDate)
        }

        else if (ativos.includes("end")) {
            const endDate = new Date(filtro.end)
            phase1 = orders.filter(order => new Date(order.orderDate) >= endDate)
        }

        const result = phase1.filter((order)=>
            ativos.every((key)=>{
                if (key === "start" || key === "end") return true;

                const filterValue = filtro[key as keyof Filter]?.toString().toLowerCase()

                const orderValue = (key === "customer") ? (
                    order.customer.name.toString().toLowerCase()
                ):(
                    order[key as keyof CustomerOrderProps]?.toString().toLowerCase()
                )
                return orderValue?.includes(filterValue)
            })
        )

        setSearchOrders(result)
    }

    return (
        <>
            <div className={styles.filterWrapper}>
                <input type="text" placeholder='Id do pedido' name="id" onChange={handleChange}/>

                <select name="customer" defaultValue="" onChange={handleChange}>
                    <option value=''>Selecionar cliente</option>
                    {customers.map(c=>(
                        <option value={c.name} key={c.id}>{c.name}</option>
                    ))}
                </select>

                <div className={styles.dateWrapper}>
                    <CalendarArrowUp size={24}/>
                    <input type="date" name='start' onChange={handleChange}/>
                </div>

                <div className={styles.dateWrapper}>
                    <CalendarArrowDown size={24}/>
                    <input type="date" name='end' onChange={handleChange}/>
                </div>

                <Button label='Buscar' onClick={filtrar}/>
            </div>

            <div className={"tableSection"}>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {searchOrders.map((order)=>(
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer.name}</td>
                                <td>R${order.total.toFixed(2)}</td>
                                <td>{order.orderDate.toString().split('T')[0]}</td>
                                <td className={"actions"}>
                                    <button onClick={()=>redirect(`/order/customer/${order.id}`)}>
                                        <Eye size={24} color='#1E90FF'/>
                                    </button>
                                    <button onClick={()=> deleteCustomerOrder(order.id)}>
                                        <Trash2 size={24} color='#ff2c2c'/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}
