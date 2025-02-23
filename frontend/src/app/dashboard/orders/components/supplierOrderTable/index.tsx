import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { CalendarArrowDown, CalendarArrowUp, Eye, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import api from '@/lib/api'
import Button from '@/components/button'
import { redirect } from 'next/navigation'
import useSuppliers from '@/hooks/useSuppliers'
import useSupplierOders from '@/hooks/useSupplierOrders'

interface Filter{
    id:string
    supplier: string
    start:Date
    end:Date
}

export default function SupplierOrderTable({orders}:{orders:SupplierOrderProps[]}) {
    const {status} = useSession()
    const {getSuppliers} = useSuppliers()
    const {deleteSupplierOrder} = useSupplierOders()

    const[suppliers, setSuppliers] = useState<SupplierProps[]>([])
    const[searchOrders, setSearchOrders] = useState<SupplierOrderProps[]>(orders)
    
    const[filtro, setFiltro] = useState<Filter>({} as Filter)

    useEffect(()=>{
        const fillSuppliers =async()=>{
            const suppliersList = await getSuppliers()
            setSuppliers(suppliersList)
        }
        
        if(status==='authenticated') fillSuppliers()
    },[status])

    function handleChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>){
        const {name, value} = event.target
        setFiltro((prev)=>({...prev, [name]:value}))
    }

    function filtrar(){
        const ativos = Object.keys(filtro).filter((key) => filtro[key as keyof Filter])
        let phase1 = orders

        if (ativos.includes("start") && ativos.includes("end")) {
            const startDate = new Date(filtro.start);
            const endDate = new Date(filtro.end);

            phase1 = orders.filter(order => {
                const orderDate = new Date(order.orderDate);
                return orderDate >= startDate && orderDate <= endDate;
            });
        }

        else if (ativos.includes("start")) {
            const startDate = new Date(filtro.start);

            phase1 = orders.filter(order => new Date(order.orderDate) <= startDate);
        }

        else if (ativos.includes("end")) {
            const endDate = new Date(filtro.end);
            
            phase1 = orders.filter(order => new Date(order.orderDate) >= endDate);
        }

        const result = phase1.filter((order)=>
            ativos.every((key)=>{
                if (key === "start" || key === "end") return true;

                const filterValue = filtro[key as keyof Filter]?.toString().toLowerCase()

                const orderValue = (key === "supplier") ? (
                    order.supplier.name.toString().toLowerCase()
                ):(
                    order[key as keyof SupplierOrderProps]?.toString().toLowerCase()
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

                <select name="supplier" defaultValue="" onChange={handleChange}>
                    <option value=''>Selecionar Fornecedor</option>
                    {suppliers.map(c=>(
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
                            <th>Fornecedor</th>
                            <th>Total</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchOrders.map((order)=>(
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.supplier.name}</td>
                                <td>R${order.total.toFixed(2)}</td>
                                <td>{order.orderDate.toString().split('T')[0]}</td>
                                <td className={"actions"}>
                                    <button onClick={()=>redirect(`/order/supplier/${order.id}`)}>
                                        <Eye size={24} color='#1E90FF'/>
                                    </button>
                                    <button onClick={()=>deleteSupplierOrder(order.id)}>
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
