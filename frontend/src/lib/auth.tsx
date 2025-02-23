import CredentialsProvider from "next-auth/providers/credentials"
import api  from "./api";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import { AxiosError } from "axios";

const authOptions:AuthOptions = {
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email: {label:'email', type:'text'},
                password: {label:'password', type:'password'}
            },
            async authorize(credentials, req){
                try{
                    const response = await api.post('/auth/login', credentials)
                    const data = response.data

                    return data
                }catch(error){
                    if(error instanceof AxiosError){
                        throw new Error(error.response?.data.message)
                    }
                    throw new Error("Erro ao Authenticar o usuário")
                    
                }
            },
        })
    ],
    pages:{
        signIn:'/'
    },
    callbacks:{
        async jwt({token, user}) {
            user &&(token.user = user)
            return token
        },
        async session({session, token}){
            session.user = token.user as {
                id:number,
                name:string, 
                email:string,
                token:string
            }
            try {
                const check = await api.get('/auth/check', {
                    headers: {
                        Authorization: `Bearer ${session.user.token}`
                    }
                })
                
                if(check.status === 200){
                    return session as any
                }
            } catch (error) {
                return null
            }

        }
    }
}

const getSession = async()=> await getServerSession(authOptions)

export {authOptions, getSession}