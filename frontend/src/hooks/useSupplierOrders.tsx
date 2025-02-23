'use cliente'
import api from "@/lib/api"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export default function useSupplierOders(){
    const {data:session} = useSession()
    
    async function getSupplierOrders() {
        let supplierOrders:SupplierOrderProps[] = []
        if(session){
            try {
                const response = await api.get('/supplier/order', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    supplierOrders = response.data
                }
            } catch (error) {
                toast.error("Não foi possivel carregar todos os pedidos.")
            }
        }

        return supplierOrders
    }
    
    async function getSupplierOrder(id:number) {
        let supplierOrder:SupplierOrderProps = {} as SupplierOrderProps
        if(session){
            try {
                const response = await api.get(`/supplier/order/${id}`, {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    supplierOrder = response.data
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao carregar pedido.')
            }
        }

        return supplierOrder
    }

    async function createSupplierOrder(data:SupplierOrderProps) {
        if(session){
            try {
                const response = await api.post(`/supplier/order`, data, {
                    headers:{
                        Authorization:`Bearer ${session?.user.token}`
                    }
                })
    
                if(response.status === 201){
                    toast.success(response.data.message)
                    setTimeout(()=>{
                        redirect('/dashboard/orders')
                    }, 800)
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao criar pedido.')
            }
        }
    }
    
    async function updateSupplierOrder(data:SupplierOrderProps, id:number) {
        try {
            const response = await api.put(`/supplier/order/${id}`, data, {
                headers:{
                    Authorization:`Bearer ${session?.user.token}`
                }
            })

            if(response.status === 200){
                toast.success(response.data.message)
                setTimeout(()=>{
                    location.reload()
                }, 800)
            }
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data.message)
                return
            }
            toast.error('Erro ao atualizar pedido.')
        }
    }
    
    async function deleteSupplierOrder(id:number) {
        if(session){
            try {
                const response = await api.delete(`/supplier/order/${id}`, {
                    headers:{
                        Authorization: `Bearer ${session?.user.token}`
                    }
                })
    
                if(response.status === 200){
                    toast.success(response.data.message)
                    setTimeout(()=>{
                        location.reload()
                    }, 300)
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao deletar pedido.')
            }
        }
    }

    return {getSupplierOrders, getSupplierOrder, createSupplierOrder, updateSupplierOrder, deleteSupplierOrder}
}