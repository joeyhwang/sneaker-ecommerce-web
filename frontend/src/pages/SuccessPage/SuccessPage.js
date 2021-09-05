import React,{useState, useEffect} from 'react'
import './SuccessPage.css'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { emptyCart } from '../../redux/actions/cartActions'
import { useDispatch} from 'react-redux'
import Table from '../../components/Table/Table'
const SuccessPage = () => {
    const {session_id} = useParams()
    const authData = useSelector(state => state.auth.authData)
    const [orderDetails,setOrderDetails] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const postOrder = async () => {
            try {
                await axios.post('/order/create' , 
                {session_id: session_id, _id: authData._id, email: authData.email,
                })
                const orderData = await axios.get('/order')
                setOrderDetails(orderData.data)

            } catch (err) {
                
                console.log(err)
            }
        }

        postOrder()

    }, [authData._id, authData.email, session_id])

    useEffect(() => {
        dispatch(emptyCart())
    }, [dispatch])

    return (
        <div className = "success_page">

            {orderDetails ?
                <>
                <h1 className= "order_placed">Order{orderDetails.orderNumber &&` #${orderDetails.orderNumber}`} Placed!</h1>
                <h2>Order Summary</h2>
                
                <Table orderDetails = {orderDetails}/>

                <Link to ="/shop/latest">
                    <button className = "continue_shopping_button">
                    Continue Shopping</button>
                </Link>
                </>
            :
                <h1>Loading</h1>
            }
            
        </div>
    )
}

export default SuccessPage
