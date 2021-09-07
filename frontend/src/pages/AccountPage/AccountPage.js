import React, {useState, useEffect} from 'react'
import './AccountPage.css'
import {useSelector} from 'react-redux'

import Collapsible from './Collapsible'
import axios from 'axios'
import Table from '../../components/Table/Table'
const AccountPage = () => {
    const authData = useSelector(state => state.auth.authData)
    const [orderData, setOrderData] = useState({orders: []})
    console.log(authData)

    useEffect(() => {
        const getAllOrders = async () => {
            const res = await axios.get('/order/all')
            setOrderData(res.data)
       }
       getAllOrders()
    }, [])

    return (
        
        <div className = "account_page">
            <div className = "left_container">
                <div className = "account_container">
                    <img src = {authData && authData.image} className = "profile_picture" alt = "profile"/>
                    <h3>
                        {authData && authData.name}
                    </h3>
                    <p>
                        {authData && authData.email}
                    </p>

                </div>
            </div>
            <div className = "right_container">
                <div className = "order_container">
                <h1>Orders</h1>
                {orderData.orders.length > 0 ? <>
                    {orderData.orders.sort((a,b)=>{
                        return b.sneakers[0].number - a.sneakers[0].number
                    }).map((order, i) => {
                        return (
                        <Collapsible order = {order} key = {i}>
                            <Table orderDetails = {order}/>
                            <div className = "shipping_container">
                                
                            </div>
                        </Collapsible>)
                    })}
                    
                </>: 
                <>
                    <h2>
                        You have not placed any orders yet.
                    </h2>
                </>}
                </div>
            </div>
        </div>
    )
}

export default AccountPage
