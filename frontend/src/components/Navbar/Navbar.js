import React, {useState, useEffect} from 'react'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import LoginModal from '../LoginModal/LoginModal'
import Dropdown from '../Dropdown/Dropdown'
import { signOut } from '../../redux/actions/authActions'
import axios from 'axios'
import { AUTH } from '../../redux/constants/authConstants'
const Navbar = ({click}) => {
    const [openModal, setOpenModal] = useState(false)
    const history = useHistory();
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logout = () => {
        dispatch(signOut(history))
        setIsLoggedIn(false)
    }

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const res = await axios.get('/profile', {withCredentials:true})
                if (res.data) {
                    setIsLoggedIn(true)

                }
                dispatch({type: AUTH, data: res.data})
            } catch (err) {
                console.log(err)
            }
        }
        getProfileData()
        
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className = "navbar">
            <div className = "navbar_logo">
                <Link to ="/" style = {{color: 'white', textDecoration: 'none'}}>
                <h2>SNEAKERS</h2>
                </Link>
            </div>

            <ul className = "navbar_links">

                <li>
                    
                    {isLoggedIn ?
                        <ul>
                            <li onMouseEnter={()=> setDropdown(true)} onMouseLeave = {()=> setDropdown(false)}>
                                <img className = "account_icon" alt = "Account" 
                                src = "/assets/other/account.png" />
                                {dropdown && <Dropdown signOut = {logout}
                                setDropdown = {setDropdown}
                                 />}
                            </li>    
                        </ul>
                     :
                     <button className = "login_button" onClick= {() => setOpenModal(openModal => !openModal)}> 
                        Login
                    </button>
                     }
                    {openModal && <LoginModal openModal = {openModal} setOpenModal = {setOpenModal}/> }
                </li>

                <li>
                    <Link to ="/cart" className = "cart_link">
                        <i className = "fas fa-shopping-cart"></i>
                    </Link>
                </li>

            </ul>
        <div className = "hamburger_menu" onClick = {click}>
            <div></div>
            <div></div>
            <div></div>    
        </div>

        </nav>
    )
}

export default Navbar
