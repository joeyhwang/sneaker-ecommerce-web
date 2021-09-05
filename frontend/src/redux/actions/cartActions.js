import {ADD_TO_CART, EMPTY_CART,REMOVE_FROM_CART, CHANGE_QUANTITY} from '../constants/cartConstants'
import axios from 'axios'

export const addToCart = (id,size, cost, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/sneakers/${id}`)

    const sneakerIndex = data.sizes.indexOf(size)
    const maxQty = data.quantities[sneakerIndex]

dispatch ({
        type: ADD_TO_CART,
        payload: {
            sneaker: data._id,
            name: data.name,
            description: data.description,
            style: data.style,
            brands: data.brands,
            size: size,
            retailPrice: data.retailPrice,
            colorway: data.colorway,
            price: cost,
            quantity: qty,
            maxQuantity: maxQty,
            imageUrls: data.imageUrls,
        }
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart =(id, size) => async (dispatch, getState) => {
    dispatch ({
        type: REMOVE_FROM_CART,
        payload: {
            cartId: id,
            cartSize: size,
        }
    })

    localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))

}

export const changeQuantityInCart =  (qty, size, sneaker) => async (dispatch, getState) => {
    dispatch({
        type: CHANGE_QUANTITY,
        payload: {
            quantity: qty,
            size: size,
            id: sneaker
        }
    })

    localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems))

}

export const emptyCart = () => async (dispatch) => {
    dispatch({
        type: EMPTY_CART,
    })

    localStorage.setItem('cart', [])
} 