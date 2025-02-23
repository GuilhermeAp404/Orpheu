'use cliente'
import api from "@/lib/api"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { toast } from "sonner"


export default function useProducts(){
    const {data:session} = useSession()
    
    async function getProducts() {
        let products:ProductProps[] = []
        if(session){
            try {
                const response = await api.get('/product', {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    products = response.data
                }
            } catch (error) {
                toast.error("Não foi possivel carregar todos os produtos.")
            }
        }

        return products
    }
    
    async function getProduct(id:number) {
        let product:ProductProps = {} as ProductProps
        if(session){
            try {
                const response = await api.get(`/product/${id}`, {
                    headers:{
                        Authorization:`Bearer ${session.user.token}`
                    }
                })

                if(response.status === 200){
                    product = response.data
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error.response?.data.message)
                    return
                }
                toast.error('Erro ao carregar produto.')
            }
        }

        return product
    }

    async function createProduct(data:ProductProps) {
        if(session){
            try {
                const response = await api.post(`/product`, data, {
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
                toast.error('Erro ao criar produto.')
            }
        }
    }
    
    async function updateProduct(data:ProductProps, product:ProductProps) {
        try {
            const response = await api.put(`/product/${product.id}`, data, {
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
            toast.error('Erro ao atualizar produto.')
        }
    }
    
    async function deleteProduct(id:number) {
        if(session){
            try {
                const response = await api.delete(`/product/${id}`, {
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
                toast.error('Erro ao deletar produto.')
            }
        }
    }

    return {getProducts, getProduct, createProduct, updateProduct, deleteProduct}
}