import React from 'react'
import './CartItem.css'
import {Link} from 'react-router-dom'


const CartItem = ({item, changeQuantity , removeItemFromCart}) => {

    const beef = () => {
        return Array.from({length: item.maxQuantity}, (_, i) => i + 1)
    }

    return (
        <div className = "cartitem">
            <Link to={`/sneaker/${item.sneaker}`} className = "cartitem_name">
                <div className = "cartitem_image" >
                    <img src ={item.imageUrls[0]} alt = "sneaker"/>
                </div>
            </Link>

            <Link to={`/sneaker/${item.sneaker}`} className = "cartitem_name">
                <p className = "cart_item_text">{item.name} Size {item.size} </p>
                
            </Link>
            <p className = "cartitem_price">${item.price * item.quantity}</p>


            <select className = "cartitem_select" value = {item.quantity}
            onChange = {(e) => changeQuantity(e.target.value, item.size, item.sneaker)}
            >
                {
                    beef().map((i) => {
                        return (
                        <option key = {i} value = {i}>{i}</option>
                        )
                    })
                }
            </select>

            <button className = "cartitem_delete"
            onClick = {() => removeItemFromCart(item.sneaker, item.size)}>
                <i className = "fas fa-trash"></i>

            </button>
        </div>
    )
}

export default CartItem
