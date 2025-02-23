'use cliente'
import api from "@/lib/api"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export default function useCustomerOders(){
    const {data:session} = useSession()
    
    async function getCustomerOrders() {
        let customerOrders:CustomerOrderProps[] = []
        if(session){
            try {
                const response = await api.get('/customer/order', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    customerOrders = response.data
                }
            } catch (error) {
                toast.error("Não foi possivel carregar todos os pedidos.")
            }
        }

        return customerOrders
    }
    
    async function getCustomerOrder(id:number) {
        let customerOrder:CustomerOrderProps = {} as CustomerOrderProps
        if(session){
            try {
                const response = await api.get(`/customer/order/${id}`, {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    customerOrder = response.data
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao carregar pedido.')
            }
        }

        return customerOrder
    }

    async function createCustomerOrder(data:CustomerOrderProps) {
        if(session){
            try {
                const response = await api.post(`/customer/order`, data, {
                    headers:{
                        Authorization:`Bearer ${session?.user.token}`
                    }
                })
    
                if(response.status === 201){
                    toast.success(response.data.message)
                    setTimeout(()=>{
                        redirect("/dashboard/orders")
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
    
    async function updateCustomerOrder(data:CustomerOrderProps, id:number) {
        try {
            const response = await api.put(`/customer/order/${id}`, data, {
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
            toast.error('Erro ao atualizar fornecedor.')
        }
    }
    
    async function deleteCustomerOrder(id:number) {
        if(session){
            try {
                const response = await api.delete(`/customer/order/${id}`, {
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

    return {getCustomerOrders, getCustomerOrder, createCustomerOrder, updateCustomerOrder, deleteCustomerOrder}
}