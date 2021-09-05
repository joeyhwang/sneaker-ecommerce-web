import React from 'react'
import {Link} from 'react-router-dom'
import './HomePage.css'
const HomePage = () => {
    return (
        <div className = "homepage" style = {{background: "url('/assets/homepage/sneakers_background2.jpg')", 
        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
        }}>
     
            <Link  to = "shop/latest">
            <button className = "sneakersButton">
                Shop Sneakers
            </button>
            </Link>
        </div>
    )
}

export default HomePage
