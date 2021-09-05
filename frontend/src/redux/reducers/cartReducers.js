import {ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY, EMPTY_CART} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const sneaker = action.payload
            const existItem = state.cartItems.find(s => 
                s.sneaker === sneaker.sneaker && s.size === sneaker.size)

            if  (existItem) {
                sneaker.quantity += existItem.quantity
                return {
                    ...state, 
                    cartItems: state.cartItems.map((s) => 
                    (s.sneaker === existItem.sneaker && s.size === existItem.size) ? sneaker : s)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, sneaker],
                }
            }

        case REMOVE_FROM_CART:
            const {cartId, cartSize} = action.payload
            let items = []
            let cartState = state.cartItems
            for (let i = 0; i < cartState.length; i++) {
                if (cartState[i].size === cartSize && cartState[i].sneaker === cartId) {
                    
                    console.log(`${cartState[i].size} ${cartSize}`)

                } else {
                    items = [...items, cartState[i]]
                }
            
            }

            return {
                ...state,
                cartItems: items
            }
        case CHANGE_QUANTITY:
            const {quantity, size, id} = action.payload
            let cartItems = []
            let existingCartState = state.cartItems
            for (let i = 0; i < existingCartState.length; i++) {
                if (size === existingCartState[i].size && id === existingCartState[i].sneaker) {
                    existingCartState[i].quantity = quantity
                    cartItems = [...cartItems, existingCartState[i]]
                } else {
                    cartItems = [...cartItems, existingCartState[i]]
                }
            }
            return {
                ...state,
                cartItems: cartItems
            }
        case EMPTY_CART:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}