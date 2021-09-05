import React from 'react'
import './SideDrawer.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const SideDrawer = ({show, click}) => {
    const sideDrawerClass = ["sidedrawer"];

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0)
    }

    
    if (show) {
        sideDrawerClass.push("show")
    }

    return (

        <div className = {sideDrawerClass.join(" ")}>
            <ul className = "sidedrawer_links" onClick = {click}>
                
                <li>
                    <Link to ="/cart">
                        <i className = "fas fa-shopping-cart"></i>
                   
                            <span className = "sidedrawer_cartbadge">{getCartCount()}</span>
                    </Link>
                </li>
                <li>
                    <Link to="/">Shop</Link>
                </li>


            </ul>                   
        </div>
    )
}

export default SideDrawer
