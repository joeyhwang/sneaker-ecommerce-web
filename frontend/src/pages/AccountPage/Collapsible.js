import React, {useState, useRef} from 'react'
import ArrowDown from '../../assets/other/arrow_down.png'
import './Collapsible.css'
const Collapsible = ({order,children,}) => {
    const parentRef = useRef()
    const [toggle, setToggle] = useState(false)

    const convertDate = (date) => {
        const beef = date.split('-')
        return `${beef[1]}/${beef[2]}/${beef[0]}`
    }

    return (
        <>
        <div className = "order_title_container" onClick = {() => {setToggle(!toggle)}}
        >
            
            <img src = {ArrowDown} alt ="arrow_dowm" 
             className ={toggle ? "arrow_button opened" : "arrow_button"}/>
            <p>
            <strong>{order.sneakers[0].status}</strong>
                {` Order #${order.sneakers[0].number} ${convertDate(order.sneakers[0].date.slice(0,10))}`
                }
            </p>
            
        </div>
        <div  ref = {parentRef} className = {toggle ? "toggle opened": "toggle"} 
        style = {toggle ? { height: parentRef.current.scrollHeight + "px"} : {height: "0px"}}> 
            {children}
        </div>

        </> 
    )
}

export default Collapsible
