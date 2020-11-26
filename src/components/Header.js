import React from 'react'
import HeadImg from './header.png'
import './Header.css';

function Header() {
    return (
        <div>
            <img src={HeadImg} alt='headimg' className='headimg'/>
        </div>
    )
}

export default Header
