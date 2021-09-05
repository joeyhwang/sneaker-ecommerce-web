import React from 'react'
import './LoginModal.css' 
import Auth  from '../components/Auth/Auth'
import Backdrop from '../components/Backdrop/Backdrop'
const LoginModal = ({openModal, setOpenModal}) => {

    const clickedModalBackground = (e) => {
        console.log(e.target.className)
       if (e.target.className === "modal_background") 
           setOpenModal(!openModal)

    }

    return (
        <>
        <div className="modal_background" onClick = {(e) => clickedModalBackground(e)}>
            <div className="modal_container">
                <div className="title_close_container">
                <button
                    onClick={() => {
                    setOpenModal(false);
                    }}
                >
                    X
                </button>
                </div>
                <h1 className = "login_text">Sign In to View Orders</h1>
                <Auth/>
            </div>
        </div>  
        <Backdrop show = {openModal} click = {() => setOpenModal(!openModal)} />
        </>
    )

}

export default LoginModal
