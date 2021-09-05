import React, {useState, useRef} from 'react'
import "./Accordion.css"
import {Link} from 'react-router-dom'
const Accordion = ({title, buttonClicked, buttons,category }) => {
    const [toggle, setToggle] = useState(false)
    const parentRef = useRef()

    return (
        <div className = "accordion">
            <button onClick = {() => setToggle(!toggle)}
            className = "accordion-button">
                <h2 className = "accordion_title">{title}</h2>
                <div style = {{marginLeft: '1rem'}}>{toggle ? '-' : '+'}</div>
            </button>

            <div
            className ={toggle ? "accordion-toggle opened" : "accordion-toggle"}
            ref = {parentRef} style = {toggle ? { height: parentRef.current.scrollHeight + "px"}
            : {height: "0px"}}
            >
                {
                    buttons.map((buttonName, index) => {
                        return (
                        <Link key = {index} to = {`/shop/${buttonName.toLowerCase()}`}>
                            <button  
                            onClick = {() => buttonClicked(buttonName)}
                            className = {category === buttonName ? "highlight_button" : ""}>
                            {buttonName}</button>
                        </Link>
                        )
                    })
                }

            </div>

        </div>
        
    )
}

export default Accordion
