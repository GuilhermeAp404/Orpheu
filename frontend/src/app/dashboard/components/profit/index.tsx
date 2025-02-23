import React from 'react'
import styles from './styles.module.scss'
import { getSession } from '@/lib/auth'
import api from '@/lib/api'

interface ProfitProps{
    profit:Number
    loss:Number
}

const getProfit = async()=>{
    const session = await getSession()
    let {profit, loss}= {profit: 0, loss: 0}
    if(session){
        try{
            let response = await api.get('/profit', {
                headers:{
                    Authorization: `Bearer ${session.user.token}`
                }
            })

            if(response.status){
                let data:ProfitProps=response.data
                profit = Number(data.profit)
                loss = Number(data.loss)
            }
        }catch(error){
            console.log(error)
        }
    }

    return {profit, loss}
}

export default async function Profit() {
    let {profit, loss} = await getProfit()
    return(
        <section className={styles.display}>
            <div className={styles.profit}>
                <h3>Entradas:</h3>
                <span>Total:</span>
                <p>R$ +{profit.toFixed(2)}</p>
            </div>
            <div className={styles.loss}>
                <h3>Saidas:</h3>
                <span>Total:</span>
                <p>R$ -{loss.toFixed(2)}</p>
            </div>
        </section>
    )
}
