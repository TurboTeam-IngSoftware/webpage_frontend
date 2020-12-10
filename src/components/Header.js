import React from 'react'
import './Header.css';
import hdrimg from '../header.png'

function Header() {
    return (
        <div>
            <img src={hdrimg} alt='headimg' className='headimg'/>
        </div>
    )
}

export default Header
