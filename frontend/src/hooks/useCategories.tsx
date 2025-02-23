'use cliente'
import api from "@/lib/api"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

type FormData = {
    categoryName:string
}

export default function useCategories(){
    const {data:session} = useSession()
    
    async function getCategories() {
        let categories:CategoryProps[] = []
        if(session){
            try {
                const response = await api.get('/category', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    categories = response.data
                }
            } catch (error) {
                toast.error("Não foi possivel carregar todas as categorias.")
            }
        }

        return categories
    }
    
    async function getCategory(id:number) {
        let category:CategoryProps = {} as CategoryProps
        if(session){
            try {
                const response = await api.get(`/category/${id}`, {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    category = response.data
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao carregar categoria.')
            }
        }

        return category
    }

    async function createCategory(data:FormData) {
        if(session){
            try {
                const response = await api.post(`/category`, data, {
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
                toast.error('Erro ao criar categoria.')
            }
        }
    }
    
    async function updateCategory(data:FormData, category:CategoryProps) {
        try {
            const response = await api.put(`/category/${category.id}`, data, {
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
            toast.error('Erro ao atualizar categoria.')
        }
    }
    
    async function deleteCategory(id:number) {
        if(session){
            try {
                const response = await api.delete(`/category/${id}`, {
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
                toast.error('Erro ao deletar categoria.')
            }
        }
    }

    return {getCategories, getCategory, createCategory, updateCategory, deleteCategory}
}