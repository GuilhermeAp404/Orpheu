'use cliente'
import api from "@/lib/api"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

type FormData = {
    address: string;
    name: string;
    phone: string;
    register: string;
}

export default function useSuppliers(){
    const {data:session} = useSession()
    
    async function getSuppliers() {
        let suppliers:SupplierProps[] = []
        if(session){
            try {
                const response = await api.get('/supplier', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    suppliers = response.data
                }
            } catch (error) {
                toast.error("Não foi possivel carregar todos os fornecedores.")
            }
        }

        return suppliers
    }
    
    async function getSupplier(id:number) {
        let supplier:SupplierProps = {} as SupplierProps
        if(session){
            try {
                const response = await api.get(`/supplier/${id}`, {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    supplier = response.data
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao carregar fornecedor.')
            }
        }

        return supplier
    }

    async function createSupplier(data:FormData) {
        if(session){
            try {
                const response = await api.post(`/supplier`, data, {
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
                toast.error('Erro ao criar fornecedor.')
            }
        }
    }
    
    async function updateSupplier(data:FormData, supplier:SupplierProps) {
        try {
            const response = await api.put(`/supplier/${supplier.id}`, data, {
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
    
    async function deleteSupplier(id:number) {
        if(session){
            try {
                const response = await api.delete(`/supplier/${id}`, {
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
                toast.error('Erro ao deletar fornecedor.')
            }
        }
    }

    return {getSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier}
}