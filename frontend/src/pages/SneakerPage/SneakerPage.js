import React, {useState, useEffect} from 'react'
import './SneakerPage.css'
import { useDispatch, useSelector } from 'react-redux'
import {getSneakerDetails} from '../../redux/actions/sneakerActions'
import {addToCart} from '../../redux/actions/cartActions'
import ReactLoading from 'react-loading'
import {useAlert} from 'react-alert'
const SneakerPage = ({match, history}) => {
    const [sneakerIncrement, setSneakerIncrement] = useState(0)
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)
    const sneakerDetails = useSelector(state => state.getSneakerDetails)
    const alert = useAlert()
    const {loading, error, sneaker} = sneakerDetails
    useEffect(() => {
        if (sneaker && match.params.id !== sneaker._id) {
            dispatch(getSneakerDetails(match.params.id))
        }

    }, [dispatch, sneaker, match])

    const addToCartHandler = () => {
        //check if size: qty in cart - size: qty current > 0. if it is, then add to cart
        //else don't allow add to cart 
        const cartSneaker = cartItems.filter(item => 
        item.sneaker === sneaker._id && item.size === sneaker.sizes[sneakerIncrement])
        if (cartSneaker.length === 0) {
            dispatch(addToCart(sneaker._id, sneaker.sizes[sneakerIncrement]
                 ,sneaker.prices[sneakerIncrement] ,qty))
            alert.success(`Added ${qty} to cart`)
            setQty(1)
        }
        else if (sneaker.quantities[sneakerIncrement] - qty - cartSneaker[0].quantity >= 0) {
            //add to cart, but increase the quanttiy update quantity
            alert.success(`Added ${qty} to cart`)

            dispatch(addToCart(sneaker._id, sneaker.sizes[sneakerIncrement]
                ,sneaker.prices[sneakerIncrement] ,qty))
            setQty(1)
        } else {
            console.log()
            // else display a message and do not add to cart
            alert.error("Not added to cart: Insufficient stock")
        }
    }  

    const incrementQty = () => {
        const cartSneaker = cartItems.filter(item => 
            item.sneaker === sneaker._id && item.size === sneaker.sizes[sneakerIncrement])
        
        if (cartSneaker.length === 0 ) {
            qty < sneaker.quantities[sneakerIncrement] ? setQty(qty => qty + 1)
            : alert.error("cannot increment above current stock")
        } else { 
            console.log(sneaker.quantities[sneakerIncrement] - qty - cartSneaker[0].quantity)
            sneaker.quantities[sneakerIncrement] - qty - cartSneaker[0].quantity <= 0 ? 
            alert.error("cannot increment above current stock") : setQty(qty => qty + 1)
        }
        
    }


    const decrementQty = () => {
        
        if (qty === 1) {
            alert.error("cannot decrement below 1")
        }
        qty > 1 && setQty(qty => qty - 1)
        
    }

    const sizeChangeHandler = (e) => {
        setQty(1)
        sneaker.sizes.map((s, i) => Number(e) === s && setSneakerIncrement(i))

    }

    const getCurrentCartValue = () => {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].sneaker === sneaker._id && cartItems[i].size === sneaker.sizes[sneakerIncrement] ) {
                    return cartItems[i].quantity
            }
        }
        return 0
    }

    const backClicked = () => {
        history.goBack()
    }

    return (
        <div className = "sneaker_page">
            
            <img src = "/assets/other/back-button.png" 
            alt = "back-button" className = "back_button"
                onClick = {() => backClicked()}
            />
            
            {loading ?
            <div className = "loading">
                <ReactLoading type = {"spin"} color ={"black"} height = {50} width = {50} /> 
            </div> 
            : error ? <h2>{error}</h2>
            : 
            <>
            <div className = "sneaker_page_container">
                <div className = "sneaker_page_left">
                    <div className = "left_image">
                    <img src = {sneaker.imageUrls ? sneaker.imageUrls[0] : ""} alt = "sneaker"/>
                    </div>
                </div>

                <div className = "sneaker_page_right">
                    <div className = "right_info">
                        <h1 className = "right_name">{sneaker.name}</h1>
                        <p>Style: {sneaker.style}</p>
                        <p>Colorway: {sneaker.colorway}</p>
                        <p>Retail Price: ${sneaker.retailPrice}</p>
                        <p>Size: 
                        <select className = "size_select"
                        onChange ={(e) => sizeChangeHandler(e.target.value)}>
                            { sneaker.sizes === undefined ? sneaker.sizes :  sneaker.sizes.map((size, i) => 
                                <option key = {i} value = {size}> {size}</option>
                            )}
                        </select>
                        </p>
                        <p>{sneaker.description}</p>
                        <p className = "price">${ sneaker.prices === undefined ? sneaker.prices : sneaker.prices[sneakerIncrement]}</p>
                        <p><span className =  "inStock">{sneaker.quantities === undefined ? 
                        sneaker.quantities : sneaker.quantities[sneakerIncrement] - getCurrentCartValue() > 0 ? 
                        `In Stock: ${sneaker.quantities[sneakerIncrement] - getCurrentCartValue() }` 
                        :"Out of Stock"}</span></p>
                        {getCurrentCartValue() > 0 && <p>In Cart: {getCurrentCartValue()}</p>}
                    
                        <div className = "cart_container">
                            <div className = "quantity_container">
                                <button className = "decrement" onClick= {() => decrementQty()}>-</button>
                                <input className = "qty_input" value = {qty} readOnly />
                                <button className = "increment" onClick = {() => incrementQty()}>+</button>
                            </div>
                            <button className = "add_to_cart" onClick = {addToCartHandler}>Add to Cart</button>

                        </div>
                        
                    </div>
                </div>
            </div>
            </>
            
            }

        </div>
    )
}

export default SneakerPage
