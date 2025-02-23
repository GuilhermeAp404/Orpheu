'use cliente'
import api from "@/lib/api"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

type FormData = {
    name: string;
    phone: string;
    address: string;
}

export default function useCustomers(){
    const {data:session} = useSession()
    
    async function getCustomers() {
        let customers:CustomerProps[] = []
        if(session){
            try {
                const response = await api.get('/customer', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    customers = response.data
                }
            } catch (error) {
                toast.error("Não foi possivel carregar todos os clientes.")
            }
        }

        return customers
    }
    
    async function getCustomer(id:number) {
        let customer:CustomerProps = {} as CustomerProps
        if(session){
            try {
                const response = await api.get(`/customer/${id}`, {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    customer = response.data
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao carregar cliente.')
            }
        }

        return customer
    }

    async function createCustomer(data:FormData) {
        if(session){
            try {
                const response = await api.post(`/customer`, data, {
                    headers:{
                        Authorization:`Bearer ${session?.user.token}`
                    }
                })
    
                if(response.status === 201){
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
                toast.error('Erro ao criar cleinte.')
            }
        }
    }
    
    async function updateCustomer(data:FormData, customer:CustomerProps) {
        try {
            const response = await api.put(`/customer/${customer.id}`, data, {
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
            toast.error('Erro ao atualizar cliente.')
        }
    }
    
    async function deleteCustomer(id:number) {
        if(session){
            try {
                const response = await api.delete(`/customer/${id}`, {
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
                toast.error('Erro ao deletar cliente.')
            }
        }
    }

    return {getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer}
}