import React from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className="nav">
        <Link to='/' className="homepage">Home</Link>

        <ul>
            <li className='active'>
                <Link to='/Search'>Find Item</Link>
            </li>
            <li>
                <Link to='/TestPage'>Test</Link>
            </li>

        </ul>
      
    </div>
  )
}

export default NavBar
