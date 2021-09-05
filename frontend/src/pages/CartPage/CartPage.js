import React from 'react'
import './CartPage.css'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import {Link } from 'react-router-dom'
import {useStripe} from '@stripe/react-stripe-js'
import {removeFromCart, changeQuantityInCart} from '../../redux/actions/cartActions'
import axios from 'axios'
import {useAlert} from 'react-alert'
const CartPage = () => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth.authData)
    const alert = useAlert()
    const stripe = useStripe()
    const removeItemFromCart = (id, size) => {
        dispatch(removeFromCart(id, size))
    }

    const changeQuantity = (qty, size, sneaker) => {
        dispatch(changeQuantityInCart(qty, size, sneaker))
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0)
    }

    const getCartSubTotal = () => {
        return cartItems.reduce((price,item) => (item.price * item.quantity) + price, 0)
    }

    const handleCheckout = async (e) => {
        e.preventDefault()
        
        const line_items = cartItems.map(item => {
            return {
                quantity: item.quantity,
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100,
                    tax_behavior: 'exclusive',
                    product_data: {
                        "name": `${item.name} Size ${item.size}`,
                
                        
                    }
                }
            }
        })
        console.log(auth)
        if (!auth || auth.length === 0) {
            alert.error("You must be logged in to checkout")
        } else {
            const response = await axios.post('create-checkout-session', {
                line_items, customer_email: auth.email
            })
            const {sessionId} = response.data
            const {error} = await stripe.redirectToCheckout({
                sessionId
            })
            if (error) {
                console.log(error)
            }
        }
        
    }

    return (
        <div className = "cart_page">
            <div className = "cart_page_left">
                <h1>Shopping Cart Sneakers</h1>
                {cartItems.length === 0 ? (
                    <> 
                    <div style ={{fontSize: '1.2rem', marginTop: '2rem'}}>
                        Your cart is empty, <Link to = "/shop/latest">Shop Sneakers</Link>
                    </div>
                    </>
                )
                :
                cartItems.map((cartItem, i) => {
                    return (
                    <CartItem key = {i} item = {cartItem}
                        removeItemFromCart = {removeItemFromCart}
                        changeQuantity = {changeQuantity}
                    />
                    )
                })
                }             

            </div>

            <div className = "cart_page_right">
                <div className = "cart_page_info">
                    <h1>Cart Total</h1>
                </div>
                <div className = "cart_page_info">
                    <p>Subtotal ({getCartCount()})</p>
                    <p>${getCartSubTotal()}</p>
                </div>
                <div className = "cart_page_info">
                    <p>Shipping</p>
                    <p>$0</p>
                </div>
                <div className = "cart_page_info">
                    <p>Tax</p>
                    <p>At Checkout</p>
                </div>
                
                <div className = "cart_page_info">
                    <p>Total</p>
                    <p>${getCartSubTotal()}</p>
                </div>
                <form onSubmit= {handleCheckout}>
                    <button className = "checkout_button" type ="submit">Checkout</button>

                </form>
            </div>


        </div>
    )
}

export default CartPage
