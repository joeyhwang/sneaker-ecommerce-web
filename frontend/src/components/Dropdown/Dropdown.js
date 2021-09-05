import React from 'react'
import {useHistory} from 'react-router-dom'
import './Dropdown.css'
const Dropdown = ({signOut, setDropdown}) => {

  const history = useHistory()

  const accountClicked = () => {
    history.push('/account')
    setDropdown(false)
  }
    return (
        <>
          <ul className = "dropdown_ul">
            <li onClick = {() => accountClicked()}>
                Account                
            </li>
            <li onClick = {() => signOut()}>
                Log out
            </li>
          </ul>  
        </>
    )
}

export default Dropdown
