import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { authReducer } from "./reducers/authReducers";
import {cartReducer} from './reducers/cartReducers'
import {getSneakersReducer, getSneakerDetailsReducer} from './reducers/sneakerReducers'


const reducer = combineReducers({
    cart: cartReducer,
    getSneakers: getSneakersReducer,
    getSneakerDetails: getSneakerDetailsReducer,
    auth: authReducer

})

const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
const userFromLocalStorage = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : []
const INITIAL_STATE = {
    auth: {
        authData: userFromLocalStorage,
    },
    cart: {
        cartItems: cartFromLocalStorage,
    }
}

const middleware = [thunk]
const store = createStore(
    reducer, 
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store